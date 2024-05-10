import React, {useEffect, useState} from 'react';
import {Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box} from '@mui/material';


function PaymentOptionsComponent({options}) {

    const [selectedValue, setSelectedValue] = useState('');

    // Установка начального значения для selectedValue при загрузке компонента
    useEffect(() => {
        if (options.length > 0 && options[0].full) {
            setSelectedValue('full');
        }
    }, [options]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div className={'infoBlock'}>
            <h2>Варианты оплаты</h2>
            <FormControl component="fieldset">
                <RadioGroup value={selectedValue} onChange={handleChange}>
                    {options.map((option, index) => {
                        const optionKey = Object.keys(option)[0]; // Получаем ключ ('full' или 'partial')
                        const optionData = option[optionKey];
                        return (
                            <FormControlLabel
                                key={index}
                                value={optionKey}
                                control={<Radio/>}
                                label={
                                    <Box sx={{display: 'flex', paddingBottom: "15px", flexDirection: 'column', alignItems: 'flex-start'}}>
                                        <Typography variant="subtitle1" sx={{
                                            fontWeight: 'bold',
                                            fontSize: "0.875rem",
                                            textAlign: 'left',
                                            lineHeight: 1.25
                                        }}>
                                            {optionData.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{
                                            fontSize: "0.675rem",
                                            textAlign: 'left',
                                            lineHeight: 1.15
                                        }}>
                                            {optionData.description}
                                        </Typography>
                                    </Box>
                                }
                                labelPlacement="start"
                                sx={{
                                    justifyContent: 'space-between',
                                    width: '330px',
                                    '& .MuiTypography-root': {flexGrow: 1}
                                }}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    );
}


export default PaymentOptionsComponent;