import React from 'react';
import QuantityPicker from "../QuantityPicker";


function TripInfoComponent() {


  return (
      <div className={'infoBlock'}>
          <h2>Ваша поездка</h2>
          <div style={{display: "flex", flexDirection: "row"}}>
              <div style={{width: "100px"}}><h3>Даты</h3></div>
              <div style={{width: "100%"}}><p>22 мая - 2 июня</p></div>
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
              <div style={{width: "100px"}}><h3>Гости</h3></div>
              <div style={{width: "100%" , paddingRight:"20px"}} >
                  <QuantityPicker quantity={1} maxValue={3}/>
              </div>
          </div>
      </div>

  );
}


export default TripInfoComponent;