import React, {useState} from 'react';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Box} from '@mui/material';


function PaymentOptionsComponent({options}) {

    const [selectedValue, setSelectedValue] = useState(options[0].value);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div className={'infoBlock'}>
            <h2>Варианты оплаты</h2>
            <FormControl component="fieldset">
                {/*<FormLabel component="legend">Выберите вариант</FormLabel>*/}
                <RadioGroup value={selectedValue} onChange={handleChange}>
                    {options.map(option => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio/>}
                            label={
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold', fontSize: "0.875rem"}}>
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{fontSize: "0.875rem"}}>
                                        {option.description}
                                    </Typography>
                                </Box>
                            }
                            labelPlacement="start" // Помещает метку перед радиокнопкой
                            sx={{
                                justifyContent: 'space-between', // Располагает текст и кнопку на разных концах
                                width: '320px',
                                '& .MuiTypography-root': {flexGrow: 1}, // Позволяет тексту занимать большую часть пространства
                            }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>

    );
}


export default PaymentOptionsComponent;