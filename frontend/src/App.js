import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BookingComponent from "./components/booking/BookingComponent";
import MainComponent from "./components/calendar/MainComponent";

import {BookingProvider} from './components/BookingContext';


function App() {
    return (
        <Router>
            <BookingProvider>
                <Routes>
                    <Route path="/booking" element={<BookingComponent/>}/>
                    <Route path="/" element={<MainComponent/>}/>
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>
            </BookingProvider>
        </Router>
    )
        ;
}


export default App;
