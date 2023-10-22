import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiUrl = 'http://127.0.0.1:8000/user';

        console.log("Posting data", formData)

        //TODO: Loading modal set true

        axios
            .post(apiUrl, formData)
            .then((response) => {
                console.log('Registration:', response.data);
                Cookies.set('id', response.data['id'], { expires: 1 });
                //TODO: Loading modal set false
                navigate('/');
            })
            .catch((error) => {
                console.error('Error trying to register:', error);
                //TODO: Loading modal set false
                //TODO: Error modal
            });
    };


    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Registro</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <Email />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <Lock />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Registrarse
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default RegistrationForm;