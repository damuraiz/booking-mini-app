import React, {useEffect, useState} from 'react';
import {DateRange} from 'react-date-range';
import {ru} from 'date-fns/locale';
import format from 'date-fns/format';
import axios from "axios";
import currencySymbols from "./CurrencySymbols";
import './MyDateRangePicker.css'

import {useCalendar} from './CalendarContext';
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

function MyDateRangePicker() {
    const [dates, setDates] = useState([]);  // Объявление состояния `dates` и функции `setDates`

    const [state, setState] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [chooseLabel, setChooseLabel] = useState("Выберите диапазон");
    const [nightsCounter, setNightsCounter] = useState("");
    const [period, setPeriod] = useState("");
    const [averagePrice, setAveragePrice] = useState("")
    const [averagePriceLabel, setAveragePriceLabel] = useState("")
    const [averageRubPrice, setAveragerRubPrice] = useState("")

    // Фиктивные данные, представьте, что это ответ API
    const averageRate = 120; // Средняя цена в валюте
    const currency = "USD";
    const exchangeRate = 75; // Курс валюты


    // Функция для обновления заголовка и диапазона дат
    const handleSelect = (ranges) => {
        const {selection} = ranges;
        setRange([selection]);

        if (selection.startDate && selection.endDate) {
            const start = new Date(selection.startDate);
            const end = new Date(selection.endDate);
            const nights = (end - start) / (1000 * 3600 * 24); // Расчёт количества ночей
            setNightsCounter(getNightsText(nights)); //
            setChooseLabel("");

            // Форматирование и установка текста подзаголовка
            const formattedStart = format(start, 'dd.MM.yyyy', {locale: ru});
            const formattedEnd = format(end, 'dd.MM.yyyy', {locale: ru});
            setPeriod(`${formattedStart} - ${formattedEnd}`);

        } else {
            setNightsCounter("Выберите диапазон");
            setPeriod("");
        }
    };

    useEffect(() => {
        if (range[0].startDate && range[0].endDate && range[0].startDate < range[0].endDate) {
            const startDate = format(range[0].startDate, 'yyyy-MM-dd');
            const endDate = format(range[0].endDate, 'yyyy-MM-dd');
            const apiUrl = process.env.REACT_APP_API_URL
            console.log(process.env.REACT_APP_API_URL)
            axios.get(`${apiUrl}/average-nightly-rate?start_date=${startDate}&end_date=${endDate}`)
                .then(response => {
                    const ap = currencySymbols.formatPrice(response.data.average_price/100, response.data.currency)
                    const arp = currencySymbols.formatPrice(response.data.average_price/100*response.data.currency_rate, 'RUB')
                    setAveragePrice(ap);
                    setAveragePriceLabel(' ночь')
                    setAveragerRubPrice(`${arp} по курсу ЦБ РФ`);
                })
                .catch(error => {
                    console.error('Error fetching average rate:', error);
                });
        }
    }, [range]); // Этот эффект запускается при изменении диапазона дат


    function getNightsText(nights) {
        const lastDigit = nights % 10;
        const lastTwoDigits = nights % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return `${nights} ночь`;
        } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
            return `${nights} ночи`;
        } else {
            return `${nights} ночей`;
        }
    }

    const {dayStyles, setStyleForDay} = useCalendar();

    const dayContentRenderer = (day) => {
        const dayString = format(day, 'yyyy-MM-dd');
        const className = dayStyles[dayString] || '';

        return (
            <span className={className}>
                {day.getDate()}
            </span>
        );
    };


    useEffect(() => {

            const apiUrl = process.env.REACT_APP_API_URL
            console.log(apiUrl)
            axios.get(apiUrl+'/get-calendar')
                .then(response => {
                    // Преобразование дат в формат, требуемый DateRangePicker
                    const formattedDates = response.data.reserved_dates.map(date => ({
                        ...date,
                        date: new Date(date.date)
                    }));
                    setDates(formattedDates);
                    formattedDates.forEach((dd) => {
                        switch (dd.status) {
                            case 'past':
                            case 'reserved':
                                setStyleForDay(format(dd.date, 'yyyy-MM-dd'), 'date-disabled');
                                break;
                            case 'for_check_out':
                                setStyleForDay(format(dd.date, 'yyyy-MM-dd'), 'date-for-check-out');
                                break;
                            default:
                                break;
                        }
                    });

                })
                .catch(error => console.error('Error fetching dates:', error));
        }, []
    );


    const disabledDates = dates.filter(date => date.status === 'past' || date.status === 'reserved').map(date => new Date(date.date));


    // Функция для форматирования даты
    const dateFormat = "dd.MM.yyyy";

    return (
        <div>
            <div style={{width: 352, fontSize: 25, fontWeight: "bold"}}>
                {chooseLabel}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 352
            }}>
                <div style={{width: 180}}>
                    <div className={'nightsCount'}>{nightsCounter}</div>
                    <div className={'period'}>{period}</div>

                </div>
                <div style={{width: 172, textAlign: "right"}}>
                    <span className={'averagePrice'}>{averagePrice}</span><span>{averagePriceLabel}</span>
                    <div className={'averageRubPrice'}>{averageRubPrice}</div>
                </div>
            </div>
            <DateRange
                dayContentRenderer={dayContentRenderer}
                disabledDates={disabledDates}
                onChange={handleSelect}
                ranges={range}
                direction="vertical"
                showDateDisplay={false}
                months={2}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                locale={ru} // Установка русской локали
                dateDisplayFormat={dateFormat} // Формат даты
                weekStartsOn={1} // Неделя начинается с понедельника
                rangeColors={['#1d2429']}
                color='#1d2429'
            />
        </div>
    );
}

export default MyDateRangePicker;
