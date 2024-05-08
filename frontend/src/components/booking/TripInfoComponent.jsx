import React from 'react';
import QuantityPicker from "../QuantityPicker";
import {Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import currencySymbols from "../../utils/CurrencySymbols";


function TripInfoComponent() {


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
                            }} align="end">22 мая - 2 июня</Typography>
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