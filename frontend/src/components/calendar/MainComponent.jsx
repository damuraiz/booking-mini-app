import React from 'react';

import MyDateRangePicker from './MyDateRangePicker';
import {ru} from "date-fns/locale";
import {CalendarProvider} from '../../utils/CalendarContext';
import FixedHeader from "../FixedHeader";


function MainComponent({onBook}) {

    const headerCaption = 'Календарь доступных дат'

    return (
        <div className="App" style={{width: '100%'}}>
            <FixedHeader headerCaption={headerCaption} showHomeLink={false}/>
            <div style={{margin: '0 auto', paddingTop: '60px'}}>
                <CalendarProvider>
                    <MyDateRangePicker locale={ru}/>
                </CalendarProvider>
            </div>
        </div>
    );
}

export default MainComponent;