import React, {createContext, useContext, useState} from 'react';
import format from 'date-fns/format';

const CalendarContext = createContext({
    dayStyles: {},  // Значения по умолчанию для контекста
    setStyleForDay: () => {
    }
});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [dayStyles, setDayStyles] = useState({});

    const setStyleForDay = (date, styleClass) => {
        const utcDate = new Date(date + 'T00:00:00Z');
        const dateKey = format(utcDate, 'yyyy-MM-dd');
        setDayStyles(prevStyles => {
            const existingClasses = prevStyles[dateKey] || '';
            // Проверяем, содержит ли уже этот класс, чтобы избежать дублирования
            if (existingClasses.split(' ').includes(styleClass)) {
                return prevStyles; // Возвращаем неизмененные стили, если класс уже есть
            }
            return {
                ...prevStyles,
                [dateKey]: `${existingClasses} ${styleClass}`.trim()
            };
        });
    };

    return (
        <CalendarContext.Provider value={{dayStyles, setStyleForDay}}>
            {children}
        </CalendarContext.Provider>
    );
};
