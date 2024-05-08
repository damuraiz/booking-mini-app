import React from 'react';
import QuantityPicker from "../QuantityPicker";
import {Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {useBooking} from '../BookingContext';

function TripInfoComponent() {

    const {contextDates} = useBooking();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function shortenDayOfWeek(day) {
        const mapping = {
            'понедельник': 'пн',
            'вторник': 'вт',
            'среда': 'ср',
            'четверг': 'чт',
            'пятница': 'пт',
            'суббота': 'сб',
            'воскресенье': 'вс'
        };
        return mapping[day.toLowerCase()] || day;
    }


    function customFormatDate(date, formatStr) {
        const formattedDate = format(date, formatStr, {locale: ru});
        // Разбиваем строку по пробелу, изменяем каждый элемент, затем объединяем обратно
        return formattedDate
            .split(' ')
            .map(part => capitalizeFirstLetter(part)) // Каждое слово с большой буквы
            .join(' ');
    }

     const formatDate = (date) => {
        // Форматируем дату, затем обрабатываем результат для корректных сокращений
        const formattedDate = customFormatDate(new Date(date), "EEEE, d MMMM");
        const parts = formattedDate.split(', ');

        // Применяем специальное сокращение для дня недели
        const dayOfWeekShort = shortenDayOfWeek(parts[0]);
        const restOfDate = parts[1];

        return `${dayOfWeekShort}, ${restOfDate}`;
    };

    return (
        <div className={'infoBlock'}>
            <h2>Ваша поездка</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{
                            paddingY: '2px',
                            borderBottom: "none"
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 'bold',
                                fontSize: "0.875rem"
                            }}> Даты < /Typography>
                        </TableCell>
                        <TableCell sx={{
                            paddingY: '2px',
                            borderBottom: "none"
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontSize: "0.875rem"
                            }} align="right">
                                {formatDate(contextDates.startDate)} - {formatDate(contextDates.endDate)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{
                            paddingY: '2px',
                            borderBottom: "none"
                        }}>
                            <Typography sx={{
                                fontWeight: 'bold',
                                fontSize: "0.875rem"
                            }}>Гости</Typography>
                        </TableCell>
                        <TableCell sx={{paddingY: '2px', borderBottom: "none"}} align="right"
                                   style={{fontWeight: 'bold', color: 'green'}}>
                            <QuantityPicker quantity={1} maxValue={3}/>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            {/*<div style={{display: "flex", flexDirection: "row"}}>*/}
            {/*    <div style={{width: "100px"}}><h3>Даты</h3></div>*/}
            {/*    <div style={{width: "100%"}}><p>22 мая - 2 июня</p></div>*/}
            {/*</div>*/}
            {/*<div style={{display: "flex", flexDirection: "row"}}>*/}
            {/*    <div style={{width: "100px"}}><h3>Гости</h3></div>*/}
            {/*    <div style={{width: "100%", paddingRight: "20px"}}>*/}
            {/*        <QuantityPicker quantity={1} maxValue={3}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

    );
}


export default TripInfoComponent;