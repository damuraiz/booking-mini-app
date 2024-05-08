import React from 'react';
import {Typography} from '@mui/material';


function RulesComponent() {


  return (
      <div className={'infoBlock'}>

          <h2>Правила</h2>
          <Typography variant="caption" align = "left" paddingX="20px">
              Нажимая кнопку ниже, я принимаю условия (Правила дома установленных хозяином, Оферта аренды недвижимости)
          </Typography>

      </div>

  );
}


export default RulesComponent;