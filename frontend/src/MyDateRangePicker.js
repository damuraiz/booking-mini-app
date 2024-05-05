import React, {useEffect, useState} from 'react';
import {DateRange} from 'react-date-range';
import {ru} from 'date-fns/locale';
import format from 'date-fns/format';
import axios from "axios";
import './MyDateRangePicker.css'

import {useCalendar} from './CalendarContext';

function MyDateRangePicker() {
    const [dates, setDates] = useState([]);  // Объявление состояния `dates` и функции `setDates`

    const [state, setState] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });


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
            setStyleForDay('2024-06-08', 'date-for-check-out');

            axios.get('http://127.0.0.1:5000/get-calendar')
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
        <DateRange
            dayContentRenderer={dayContentRenderer}
            disabledDates={disabledDates}
            onChange={item => setState(item.selection)}
            ranges={[state]}
            direction="vertical"
            showDateDisplay={false}
            months={2}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            locale={ru} // Установка русской локали
            dateDisplayFormat={dateFormat} // Формат даты
            weekStartsOn={1} // Неделя начинается с понедельника
            rangeColors={['#1d2429']}
            color ='#1d2429'
        />
    );
}

export default MyDateRangePicker;
