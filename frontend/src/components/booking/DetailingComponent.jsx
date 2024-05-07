import React from 'react';
import {Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import currencySymbols from "../../utils/CurrencySymbols";

function DetailingComponent({
                                currency,
                                averagePricePerNight,
                                nights,
                                discountName,
                                discountAmount,
                                cleaningFee,
                                tax
                            }) {
    const subtotal = averagePricePerNight * nights;
    const total = subtotal - discountAmount + cleaningFee + tax;

    return (
        <div className={'infoBlock'}>

            <h2>Детализация цены</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: "none" }}>{currencySymbols.formatPrice(averagePricePerNight, currency)} &#10005; {nights} ночей</TableCell>
                        <TableCell sx={{ borderBottom: "none" }} align="right">{currencySymbols.formatPrice(subtotal, currency)}</TableCell>
                    </TableRow>
                    {discountAmount > 0 && (
                        <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>{discountName}</TableCell>
                            <TableCell sx={{ borderBottom: "none" }} align="right" style={{fontWeight: 'bold', color: 'green'}}>
                                -{currencySymbols.formatPrice(discountAmount, currency)}
                            </TableCell>
                        </TableRow>
                    )}
                    {cleaningFee > 0 && (
                        <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>Плата за уборку</TableCell>
                            <TableCell sx={{ borderBottom: "none" }} align="right">{currencySymbols.formatPrice(cleaningFee, currency)}</TableCell>
                        </TableRow>
                    )}
                    {tax > 0 && (
                        <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>Налог</TableCell>
                            <TableCell sx={{ borderBottom: "none" }} align="right">{currencySymbols.formatPrice(tax, currency)}</TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell style={{paddingTop: '1px'}}
                                   colSpan={2}/>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: "none" }}>Итого</TableCell>
                        <TableCell sx={{ borderBottom: "none" }} align="right" style={{fontWeight: 'bold'}}>{currencySymbols.formatPrice(total, currency)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

    );
}


export default DetailingComponent;