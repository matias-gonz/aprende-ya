import React, { Component } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle, Lock } from '@mui/icons-material';

// Importa el archivo CSS
import './LoginForm.css';
import {Grid, Typography} from "@mui/material";

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        const apiUrl = 'URL_API'; // Reemplaza esto con la URL de tu API

        axios
            .post(apiUrl, data)
            .then((response) => {
                console.log('Login:', response.data);
            })
            .catch((error) => {
                console.error('Error al intentar iniciar sesión:', error);
            });
    };

    render() {
        return (
            <Container maxWidth="sm">
                <form onSubmit={this.handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Iniciar sesión</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre de usuario"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                InputProps={{
                                    startAdornment: <AccountCircle />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Contraseña"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                InputProps={{
                                    startAdornment: <Lock />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Iniciar sesión
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Link to="/registro">Registrarse</Link>
            </Container>
        );
    }
}

export default LoginForm;