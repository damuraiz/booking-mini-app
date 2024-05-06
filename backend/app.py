import os, base64

from flask import Flask, jsonify, request
from flask_cors import CORS
from clients.hospitable import HospitableClient
from clients.сbr import CbrClient
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})


@app.route('/get-calendar')
def get_calendar():
    current_date = datetime.now()
    current_month = current_date.month
    current_year = current_date.year
    calendar = {
        "max_stay": max_stay,
        "reserved_dates": []
    }

    booked_dates = []
    for i in range(3):
        month = (current_month + i - 1) % 12 + 1
        year = current_year + (current_month + i - 1) // 12
        dates = hospitable.get_booked_dates_by_month(month, year)
        booked_dates.extend([(datetime.strptime(date, "%Y-%m-%d"), 'reserved') for date in dates])

    # Установка статусов
    for i in range(len(booked_dates)):
        date, status = booked_dates[i]
        if date < current_date:
            status = 'past'
        elif i > 0 and ((booked_dates[i][0] - timedelta(days=1)).strftime("%Y-%m-%d") != booked_dates[i - 1]['date']):
            status = 'for_check_out'
        booked_dates[i] = {"date": date.strftime("%Y-%m-%d"), "status": status}

    calendar["reserved_dates"] = booked_dates
    return jsonify(calendar)


@app.route('/average-nightly-rate', methods=['GET'])
def get_average_nightly_rate():
    start_date = request.args.get('start_date')  # Получаем дату начала из запроса
    end_date = request.args.get('end_date')  # Получаем дату окончания из запроса
    print(start_date, end_date)
    if not start_date or not end_date:
        return jsonify({'error': 'Missing start_date or end_date'}), 400

    # Конвертация строк в объекты datetime
    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        delta = end_date - start_date
        print(delta.days)
        if delta.days > int(max_stay):
            return jsonify({'error': f'your period {delta.days} exceeds max available {max_stay} '}), 400

        all_prices = []
        current_date = start_date
        currency = None

        while current_date.month <= end_date.month and current_date.year <= end_date.year:
            prices = hospitable.get_prices_by_month(current_date.month, current_date.year)
            currency = prices[0]['currency']
            if (current_date.month == start_date.month and
                    current_date.year == start_date.year and
                    current_date.month == end_date.month and
                    current_date.year == end_date.year):
                all_prices.extend([price['price'] for price in prices if
                                   start_date.strftime('%Y-%m-%d') <= price['date'] < end_date.strftime('%Y-%m-%d')])
            elif (current_date.month == start_date.month and
                  current_date.year == start_date.year):
                all_prices.extend([price['price'] for price in prices if
                                   start_date.strftime('%Y-%m-%d') <= price['date']])
            elif (current_date.month == end_date.month and
                  current_date.year == end_date.year):
                all_prices.extend([price['price'] for price in prices if
                                   end_date.strftime('%Y-%m-%d') > price['date']])
            else:
                all_prices.extend([price['price'] for price in prices])
            current_date = current_date + relativedelta(months=1)

        if all_prices:
            for price in all_prices:
                print(price)
            average_price = round(sum(all_prices) / len(all_prices) * (1 + price_increase_percentage/100), -2)
            currency_rate = cbr.get_currency_rate(currency)
            return jsonify({"average_price": average_price, "currency": currency, 'currency_rate': currency_rate})
        else:
            return jsonify({"error": "No prices available for the given date range"}), 400


    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400


encoded_hospitable_token = os.getenv('ENCODED_HOSPITABLE_TOKEN')
hospitable_token = base64.b64decode(encoded_hospitable_token).decode()

hospitable_property_id = os.getenv('HOSPITABLE_PROPERTY_ID')
max_stay = os.getenv('MAX_STAY')
price_increase_percentage = float(os.getenv('PRICE_INCREASE_PERCENTAGE'))
print(price_increase_percentage)

hospitable = HospitableClient(hospitable_token, hospitable_property_id)
cbr = CbrClient()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
