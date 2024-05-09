from datetime import datetime, timedelta

class DateUtil:
    @staticmethod
    def generate_month_range(start_date, end_date):
        current = start_date
        while current <= end_date:
            yield current.year, current.month
            # Переход к следующему месяцу
            if current.month == 12:
                current = datetime(current.year + 1, 1, 1)
            else:
                current = datetime(current.year, current.month + 1, 1)

    @staticmethod
    def fetch_data_for_range(start_date_str, end_date_str):
        # Преобразование строк в объекты datetime
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
        # Вычитаем один день из end_date
        end_date_adjusted = end_date - timedelta(days=1)

        results = []
        for year, month in DateUtil.generate_month_range(start_date, end_date_adjusted):
            result = DateUtil.fetch_data_for_month(year, month)  # Предполагается, что это ваша функция API
            results.append(result)

        return results

    @staticmethod
    def fetch_data_for_month(year, month):
        # Заглушка функции, которая должна вызывать ваш API
        print(f"Fetching data for {year}-{month}")
        return {"year": year, "month": month, "data": "Sample data"}


DateUtil.fetch_data_for_range("2024-09-01", "2025-01-01")