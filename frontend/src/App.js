import './App.css';
// import MyDateRangePicker from './MyDateRangePicker';
// import {ru} from "date-fns/locale";
// import {CalendarProvider} from './CalendarContext';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BookingComponent from "./components/booking/BookingComponent";
import MainComponent from "./components/calendar/MainComponent";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/booking" element={<BookingComponent/>}/>
                <Route path="/" element={<MainComponent/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
        </Router>
        // <div className="App" style={{width: '100%'}}>
        //     <div>
        //         {/*<h1 style={{textAlign: 'center'}}>Уютная квартира@Сурин</h1>*/}
        //     </div>
        //     <div style={{margin: '0 auto'}}>
        //         <CalendarProvider>
        //             <MyDateRangePicker locale={ru}/>
        //         </CalendarProvider>
        //     </div>
        // </div>
    )
        ;
}


export default App;
