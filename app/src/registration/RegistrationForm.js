import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
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
        const { username, email, password } = formData;
        //registerUser(username, email, password);
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
                            label="Nombre de usuario"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <AccountCircle />,
                            }}
                        />
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