import React, { useState } from 'react';
import {Container, Paper, TextField, Button, Alert, AlertTitle} from '@mui/material';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {green, red} from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../header/Header";


function PaymentForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolder, setCardHolder] = useState('');

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(false);

    const [loading, setLoading] = useState(false)

    const handleSuccess = () => {
        setPaymentSuccess(true);
        setPaymentError(false);
    };

    const handleError = () => {
        setPaymentSuccess(false);
        setPaymentError(true);
    };

    const handleAlertClose = () => {
        setPaymentSuccess(false);
        setPaymentError(false);
    };

    const handlePayment = () => {

        setLoading(true)

        setTimeout(() => {
            // This code will be executed after the specified delay (in milliseconds)
            setLoading(false)
            if (cardNumber !== '0000000000000000') {
                handleSuccess()
            } else {
                handleError()
            }
        }, 2000);
    }

    return (
        <div>
            <Header/>
            <Container maxWidth="sm" elevation={0}>
                <div style={{ position: 'relative', paddingTop: '20px' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Paper style={{ padding: '20px', boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }}>
                            <Cards
                                number={cardNumber}
                                name={cardHolder}
                                expiry={expiryDate}
                                cvc={cvv}
                                focused="" // Puedes cambiar el enfoque según el campo que desees
                            />
                        </Paper>
                    </div>
                    {/* Success alert */}
                    {paymentSuccess && (
                        <Alert
                            severity="success"
                            onClose={handleAlertClose}
                            sx={{ backgroundColor: green[600], color: '#fff' }}
                        >
                            <AlertTitle>Felicidades!</AlertTitle>
                            Tu pago se ha efectuado correctamente.
                        </Alert>
                    )}

                    {/* Error alert */}
                    {paymentError && (
                        <Alert
                            severity="error"
                            onClose={handleAlertClose}
                            sx={{ backgroundColor: red[500], color: '#fff' }}
                        >
                            <AlertTitle>Error</AlertTitle>
                            Hubo un problema al procesar el pago.
                        </Alert>
                    )}
                </div>
                <div>
                    <form>
                        <TextField
                            label="Número de Tarjeta"
                            fullWidth
                            variant="outlined"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            style={{ marginBottom: '10px', marginTop: '20px' }}
                        />
                        <TextField
                            label="Fecha de Vencimiento"
                            fullWidth
                            variant="outlined"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            style={{ marginBottom: '10px' }}

                        />
                        <TextField
                            label="CVV"
                            fullWidth
                            variant="outlined"
                            value={cvv}
                            onChange={(e) => setCVV(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Titular de la Tarjeta"
                            fullWidth
                            variant="outlined"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                    </form>
                </div>
                <div>
                    <LoadingButton loading={loading} loadingIndicator="Pagando…" type="submit" variant="contained" color="primary" fullWidth onClick={handlePayment}>
                        Pagar
                    </LoadingButton>
                </div>
            </Container>
        </div>
    );
}

export default PaymentForm;