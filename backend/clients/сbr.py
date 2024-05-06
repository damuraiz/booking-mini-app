from functools import lru_cache

import requests

from xml.etree import ElementTree
from requests.exceptions import HTTPError


class CbrClient:
    def __init__(self):
        self.base_url = 'https://www.cbr.ru/scripts/XML_daily.asp'

    @lru_cache(maxsize=50)
    def get_currency_rate(self, currency_code):
        try:
            response = requests.get(self.base_url)
            response.raise_for_status()

            root = ElementTree.fromstring(response.content)
            for valute in root.findall('Valute'):
                if valute.find('CharCode').text == currency_code:
                    nominal = int(valute.find('Nominal').text)
                    value = float(valute.find('Value').text.replace(',', '.'))
                    return value / nominal
        except HTTPError as e:
            print(f"HTTP error occurred: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")

        return None  # В случае ошибки или отсутствия валюты


client = CbrClient()
rate = client.get_currency_rate('USD')
print(f"Курс USD к RUB: {rate if rate else 'Не удалось получить курс'}")

rate = client.get_currency_rate('THB')
print(f"Курс THB к RUB: {rate if rate else 'Не удалось получить курс'}")
