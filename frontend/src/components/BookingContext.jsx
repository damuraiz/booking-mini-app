import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function useBooking() {
    return useContext(BookingContext);
}

export const BookingProvider = ({ children }) => {
    const [contextDates, setContextDates] = useState({ startDate: null, endDate: null });

    return (
        <BookingContext.Provider value={{ contextDates: contextDates, setContextDates: setContextDates }}>
            {children}
        </BookingContext.Provider>
    );
};