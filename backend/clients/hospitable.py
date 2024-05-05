import base64
import os

import requests
from functools import lru_cache
from datetime import datetime


class HospitableClient:
    def __init__(self, api_key, property_id):
        self.api_key = api_key
        self.property_id = property_id
        self.base_url = "https://public.api.hospitable.com/v2/"

    def get_available_dates(self):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        endpoint = f"{self.base_url}properties/{self.property_id}/calendar"
        response = requests.get(endpoint, headers=headers)
        if response.status_code == 200:
            return response.json()  # Предполагается, что API возвращает JSON с датами
        else:
            response.raise_for_status()

    @lru_cache(maxsize=50)
    def get_booked_dates_by_month(self, month, year):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        endpoint = f"{self.base_url}properties/{self.property_id}/calendar"

        # Вычисляем первый и последний день месяца
        s_date = datetime(year, month, 1).strftime('%Y-%m-%d')
        if month == 12:
            e_date = datetime(year + 1, 1, 1).strftime('%Y-%m-%d')
        else:
            e_date = datetime(year, month + 1, 1).strftime('%Y-%m-%d')

        params = {
            "start_date": s_date,
            "end_date": e_date
        }

        response = requests.get(endpoint, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()['data']['days']
            result = [entry['date'] for entry in data if not entry['status']['available']]
            return result
        else:
            response.raise_for_status()


# Использование класса

encoded_hospitable_token = os.getenv('ENCODED_HOSPITABLE_TOKEN')
hospitable_token = base64.b64decode(encoded_hospitable_token).decode()

hospitable_property_id = os.getenv('HOSPITABLE_PROPERTY_ID')

client = HospitableClient(hospitable_token, hospitable_property_id)
booked_dates = client.get_booked_dates_by_month(6, 2024)
for data in booked_dates:
    print(data)
#print(booked_dates)

