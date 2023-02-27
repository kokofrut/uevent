import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&$error': {
          borderColor: 'red',
        },
      },
    },
  },
});

const PaymentCard = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorCardNumber, setErrorCardNumber] = useState(false);
    const [errorExpDate, setErrorExpDate] = useState(false);
    const [errorCvv, setErrorCvv] = useState(false);
    let navigate = useNavigate();

    const handleCardNumber = (e) => {
        setCardNumber(e.target.value);
        if(e.target.value.length !== 16) {
            setErrorCardNumber(true);
        } else {
            setErrorCardNumber(false);
        }
    };

    const handleExpDate = (e) => {
        
        if (e.target.value.length === 2) {
            setExpDate(e.target.value );
        } else {
            setExpDate(e.target.value);
            if(e.target.value.length !== 5 || e.target.value[2] !== '/') {
                setErrorExpDate(true);
            } else {
                setErrorExpDate(false);
            }
        }
    };
    function handleKeyDown(e) {
        if (e.keyCode === 8) {
            console.log(e)
            setExpDate(e.target.value.slice(0, -2))
        }

    }

    const handleCvv = (e) => {
        setCvv(e.target.value);
        if(e.target.value.length !== 3) {
            setErrorCvv(true);
        } else {
            setErrorCvv(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(errorCardNumber || errorExpDate || errorCvv) {
            return;
        }
        // send cardNumber, expDate, and cvv to the server here
        // for example, you can use fetch api to send data to the server
        // fetch('/payment', {
        //   method: 'POST',
        //   body: JSON.stringify({ cardNumber, expDate, cvv }),
        //   headers: { 'Content-Type': 'application/json' },
        // })
        // .then(res => res.json())
        // .then(data => {
        //   console.log('Success:', data);
        // })
        // .



        navigate("/payment")
        };

    return (
        <ThemeProvider theme={theme}>
        <Card style={{ minWidth: 275}}>
            <CardContent>
                <Typography style={{ fontSize: 14}} color="textSecondary" gutterBottom>
                    Payment Information
                </Typography>
                <form>
                    <TextField
                        required
                        error={errorCardNumber}
                        id="card-number"
                        label="Card Number"
                        type="text"
                        placeholder="Enter Card Number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 16,
                        }}
                        style={{ marginBottom: 20}}
                        value={cardNumber}
                        onChange={handleCardNumber}
                    />
                    <TextField
                        required
                        error={errorExpDate}
                        id="exp-date"
                        label="Expiration Date"
                        type="text"
                        placeholder="MM/YY"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 5,
                        }}
                        style={{ marginBottom: 20}}
                        value={expDate}
                        onChange={handleExpDate}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        required
                        error={errorCvv}
                        id="cvv"
                        label="CVV"
                        type="text"
                        placeholder="CVV"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 3,
                        }}
                        value={cvv}
                        onChange={handleCvv}
                    />
                    <Button 
                        style={{ marginTop: 20}}
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
        </ThemeProvider>
    );
}

export default PaymentCard;