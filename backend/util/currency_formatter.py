class CurrencyFormatter:

    def __init__(self):
        # Словарь хранит символ валюты и булево значение: True если символ должен стоять перед суммой, False - если после
        self.currencies = {
            'USD': ('$', True),
            'EUR': ('€', True),
            'GBP': ('£', True),
            'JPY': ('¥', True),
            'RUB': ('₽', False),
            'INR': ('₹', True),
            'CNY': ('¥', True),
            'KRW': ('₩', True),
            'THB': ('฿', True)
        }

    def format_currency(self, amount, ticker):
        """Форматирует сумму с учётом валюты."""
        symbol, is_prefix = self.currencies.get(ticker, ('$', True))  # По умолчанию используем доллар США
        if is_prefix:
            return f"{symbol}{amount:.2f}"
        else:
            return f"{amount:.2f}{symbol}"


# Пример использования класса
formatter = CurrencyFormatter()
print(formatter.format_currency(1234.56, 'USD'))  # $1234.56
print(formatter.format_currency(1234.56, 'RUB'))  # 1234.56₽
print(formatter.format_currency(1234.56, 'EUR'))  # €1234.56
