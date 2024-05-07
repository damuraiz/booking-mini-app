import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function QuantityPicker({maxValue}) {
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        if (quantity < maxValue) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrement = () => setQuantity(prev => Math.max(0, prev - 1));

    return (
        <Box display="flex" justifyContent="flex-end" gap={0}>
            <Button variant="outlined"
                    onClick={decrement}
                    disabled={quantity <= 1}
                    size="small"
                    sx={{ minWidth: 40, height: 40, padding: '0px 0px' }} >
                -
            </Button>
            <TextField
                size="small"
                value={quantity}
                inputProps={{readOnly: true}}
                style={{width: '40px', textAlign: 'center'}}
            />
            <Button variant="outlined"
                    onClick={increment}
                    size="small"
                    disabled={quantity >= maxValue}
                    sx={{ minWidth: 40, height: 40, padding: '0px 0px' }} >
                +
            </Button>
        </Box>
    );
}

export default QuantityPicker;
