import React from 'react';

import { useNavigate } from 'react-router-dom';
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
          <div style={{ paddingTop: '60px' , width: '352px'}}>
              <TripInfoComponent/>
          </div>
          <div>
              <DetailingComponent/>
          </div>
          <div>
              <RulesComponent/>
          </div>
          <div>
              <button onClick={goBack}
                      className={'enabledButton'}>
                  <span style={{fontWeight: "bold", fontSize: 18, color: "white"}}>Вернуться</span>
              </button>
          </div>

      </div>

  );
}

export default BookingComponent;