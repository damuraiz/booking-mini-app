import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import './BookingComponent.css'

import FixedHeader from "../FixedHeader";
import TripInfoComponent from "./TripInfoComponent";
import DetailingComponent from "./DetailingComponent";
import RulesComponent from "./RulesComponent";
import PaymentOptionsComponent from "./PaymentOptionsComponent";

import {useBooking} from '../BookingContext';
import axios from "axios";
import format from "date-fns/format";


function BookingComponent() {

    const navigate = useNavigate();
    const {contextDates} = useBooking();
    const [bookingDetails, setBookingDetails] = useState(null);

    const headerCaption = 'Подтвердите и оплатите'

    const paymentOptions = [
        {value: 'option1', title: 'Вариант 1', description: 'Описание варианта 1'},
        {value: 'option2', title: 'Вариант 2', description: 'Описание варианта 2'},
        {value: 'option3', title: 'Вариант 3', description: 'Описание варианта 3'}
    ];


    const goBack = () => {
        navigate('/')//
    };

    useEffect(() => {
        fetchBookingDetails();
    }, []);

    function formatDate(date) {
        return date.toISOString().slice(0, 10);
    }


    const fetchBookingDetails = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL

            const p = JSON.stringify({
                start_date: formatDate(contextDates.startDate),
                end_date: formatDate(contextDates.endDate),
                num_people: 2
            })
            console.log(p)

            const response = await fetch(`${apiUrl}/calculate-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: p
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setBookingDetails(data);
            } else {
                throw new Error('Something went wrong with the booking calculation');
            }
        } catch (error) {
            console.error('Failed to fetch booking details:', error);
        }
    };

    if (!bookingDetails) return <div>Loading...</div>;

    return (
        <div className="App" style={{width: '100%'}}>
            <FixedHeader headerCaption={headerCaption} showHomeLink={true}/>
            <div style={{paddingTop: '60px', width: '352px'}}>
                <TripInfoComponent/>
            </div>
            <div>
                <DetailingComponent currency={bookingDetails.currency_ticker}
                                    averagePricePerNight={bookingDetails.average_night_price}
                                    nights={bookingDetails.num_nights}
                                    discountName={bookingDetails.discount_name}
                                    discountAmount={bookingDetails.discount_amount}
                                    cleaningFee={bookingDetails.cleaning_fee}
                                    tax={null}
                />
            </div>
            <div>
                <PaymentOptionsComponent options={bookingDetails.payment_options}/>
            </div>
            <div>
                <RulesComponent/>
            </div>
            <div>
                <button onClick={goBack}
                        className={'enabledButton'}>
                    <span style={{fontWeight: "bold", fontSize: 18, color: "white"}}>Оплатить и бронировать</span>
                </button>
            </div>

        </div>

    );
}

// discountName,
//                                 discountAmount,
//                                 cleaningFee,
//                                 tax

export default BookingComponent;