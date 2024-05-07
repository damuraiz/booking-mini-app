import React from 'react';

import {useNavigate} from 'react-router-dom';
import './BookingComponent.css'

import FixedHeader from "../FixedHeader";
import TripInfoComponent from "./TripInfoComponent";
import DetailingComponent from "./DetailingComponent";
import RulesComponent from "./RulesComponent";


function BookingComponent() {

    const navigate = useNavigate();
    const headerCaption = 'Подтвердите и оплатите'

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