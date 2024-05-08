import React from 'react';

import {useNavigate} from 'react-router-dom';
import './BookingComponent.css'

import FixedHeader from "../FixedHeader";
import TripInfoComponent from "./TripInfoComponent";
import DetailingComponent from "./DetailingComponent";
import RulesComponent from "./RulesComponent";
import PaymentOptionsComponent from "./PaymentOptionsComponent";

import { useBooking } from '../BookingContext';


function BookingComponent() {

    const navigate = useNavigate();
    const { contextDates } = useBooking();
    const headerCaption = 'Подтвердите и оплатите'

    const paymentOptions = [
        {value: 'option1', title: 'Вариант 1', description: 'Описание варианта 1'},
        {value: 'option2', title: 'Вариант 2', description: 'Описание варианта 2'},
        {value: 'option3', title: 'Вариант 3', description: 'Описание варианта 3'}
    ];


    const goBack = () => {
        navigate('/')//
    };

    return (
        <div className="App" style={{width: '100%'}}>
            <FixedHeader headerCaption={headerCaption} showHomeLink={true}/>
            <div style={{paddingTop: '60px', width: '352px'}}>
                <TripInfoComponent/>
            </div>
            <div>
                <DetailingComponent currency="THB"
                                    averagePricePerNight={1000}
                                    nights={10}
                                    discountName="Скидка за неделю"
                                    discountAmount={1000}
                                    cleaningFee={800}
                                    tax={300}
                />
            </div>
            <div>
                <PaymentOptionsComponent options={paymentOptions}/>
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