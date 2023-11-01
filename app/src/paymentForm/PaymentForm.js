import React, { useState } from 'react';
import {Container, Paper, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


function PaymentForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [loading, setLoading] = useState(false)


    const handleSubmit = () => {
        setLoading(true)

        setTimeout(() => {
            // This code will be executed after the specified delay (in milliseconds)
            setLoading(false);
        }, 3000);
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Cards
                    number={cardNumber}
                    name={cardHolder}
                    expiry={expiryDate}
                    cvc={cvv}
                    focused="number" // Puedes cambiar el enfoque según el campo que desees
                />
                <form onSubmit={handleSubmit}>
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
                    <LoadingButton loading={loading} loadingIndicator="Pagando…" type="submit" variant="contained" color="primary">
                        Agregar Curso
                    </LoadingButton>
                </form>
            </Paper>
        </Container>
    );
}

export default PaymentForm;