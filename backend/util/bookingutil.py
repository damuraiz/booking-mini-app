# from datetime import datetime

import os

from datetime import datetime
from dateutil.relativedelta import relativedelta

from clients.сbr import CbrClient
from util.currency_formatter import CurrencyFormatter


class BookingUtil:

    def __init__(self):
        self.max_stay = int(os.getenv('MAX_STAY'))
        self.max_people = int(os.getenv('MAX_PEOPLE'))
        self.price_increase_percentage = float(os.getenv('PRICE_INCREASE_PERCENTAGE'))
        self.discounts = {'week': {"name": "Скидка за неделю", "percentage": float(os.getenv('WEEK_DISCOUNT'))},
                          'month': {"name": "Скидка за месяц", "percentage": float(os.getenv('MONTH_DISCOUNT'))}}
        self.cleaning_fee = int(os.getenv('CLEANING_FEE'))
        self.payment_options_template = {
            "full": {"name": "{rub_amount} сейчас", "description": "Оплачивается в рублях по курсу ЦБ РФ"},
            "partial": {"name": "{rub_first_amount} сейчас, остаток - позже",
                        "description": "{first_amount} к оплате сегодня по курсу ЦБ РФ, \n"
                                       "{last_amount} нужно внести до {last_amount_date} по курсу ЦБ РФ на дату внесения"}
        }
        self.partial_percentage = float(os.getenv('PARTIAL_OPTION_PERCENTAGE'))

    def check_max_stay(self, start_date, end_date):
        nights = (end_date - start_date).days
        if nights > self.max_stay:
            raise ValueError('Maximum stay reached')

    @staticmethod
    def check_period(start_date, end_date):
        if start_date >= end_date:
            raise ValueError('Start date must be before end date')

    def check_max_people(self, num_people):
        if num_people > self.max_people or num_people <= 0:
            raise ValueError('Max people problem')

    def increase_price(self, price):
        return price * (1 + self.price_increase_percentage / 100)

    def get_discount(self, num_nights, amount):
        if num_nights >= 28:
            return self.discounts['month']['name'], amount * self.discounts['month']['percentage'] / 100
        elif num_nights >= 7:
            return self.discounts['week']['name'], amount * self.discounts['week']['percentage'] / 100
        else:
            return "", 0

    def get_cleaning_fee(self, num_nights):
        print(num_nights)
        return self.cleaning_fee

    def get_payment_options(self, amount, currency, start_date):
        first_amount = round(amount * self.partial_percentage / 100, 2)
        last_amount = amount - first_amount

        cbr = CbrClient()
        formatter = CurrencyFormatter()

        rub_amount = round(amount * cbr.get_currency_rate(currency), 2)
        rub_first_amount = round(first_amount * cbr.get_currency_rate(currency), 2)
        last_day = start_date - relativedelta(months=1)

        rub_amount_str = formatter.format_currency(amount=rub_amount, ticker="RUB")
        rub_first_amount_str = formatter.format_currency(amount=rub_first_amount, ticker="RUB")
        first_amount_str = formatter.format_currency(amount=first_amount, ticker=currency)
        last_amount_str = formatter.format_currency(amount=last_amount, ticker=currency)
        last_day_str = last_day.strftime("%d.%m.%Y")

        full_option = {
            "full": {
                "name": self.payment_options_template['full']['name'].format(rub_amount=rub_amount_str),
                "description": self.payment_options_template['full']['description']
            }
        }

        partial_option = {
            "partial": {
                "name": self.payment_options_template['partial']['name'].format(rub_first_amount=rub_first_amount_str),
                "description": self.payment_options_template['partial']['description']
                .format(first_amount=first_amount_str,
                        last_amount=last_amount_str,
                        last_amount_date=last_day_str)
            }
        }

        options = [full_option]
        if last_day > datetime.now():
            options.append(partial_option)

        return options

# util = BookingUtil()
# util.check_max_stay(datetime.strptime('2024-01-05', "%Y-%m-%d"), datetime.strptime('2024-01-06', "%Y-%m-%d"))
