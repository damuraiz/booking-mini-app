import os, base64

from flask import Flask, jsonify
from flask_cors import CORS
from clients.hospitable import HospitableClient
from datetime import datetime, timedelta

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
        dates = client.get_booked_dates_by_month(month, year)
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


encoded_hospitable_token = os.getenv('ENCODED_HOSPITABLE_TOKEN')
hospitable_token = base64.b64decode(encoded_hospitable_token).decode()

hospitable_property_id = os.getenv('HOSPITABLE_PROPERTY_ID')
max_stay = os.getenv('MAX_STAY')

client = HospitableClient(hospitable_token, hospitable_property_id)

if __name__ == '__main__':
    app.run(debug=True)
