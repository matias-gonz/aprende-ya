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
import Cookies from "js-cookie";

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleLogin = (e) => {
        e.preventDefault();

        const apiUrl = 'http://127.0.0.1:8000/user';

        const queryParams = {
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .get(apiUrl, { params: queryParams })
            .then((response) => {
                console.log('Login:', response.data);
                Cookies.set('id', response.data['id'], { expires: 1 });
            })
            .catch((error) => {
                console.error('Error trying to login:', error);
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
                                label="Email"
                                name="email"
                                value={this.state.email}
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