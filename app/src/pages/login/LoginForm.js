import React, {useState} from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AccountCircle, Lock, Person} from '@mui/icons-material';
import './LoginForm.css';
import {Grid, Typography} from "@mui/material";
import Cookies from 'js-cookie';


function LoginForm({handleLoginState}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const apiUrl = 'http://127.0.0.1:8000/user';

    axios
      .get(apiUrl, {params: data})
      .then((response) => {
        console.log('Login:', response.data);
        Cookies.set('user_id', response.data['id'], {expires: 1});
        handleLoginState();
        navigate('/');
      })
      .catch((error) => {
        alert('Error al intentar iniciar sesión: ', error)
        console.error('Error al intentar iniciar sesión:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Iniciar sesión</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <AccountCircle/>,
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
                startAdornment: <Lock/>,
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
      <Button color={"primary"} variant={"contained"} component={Link} to="/registro"
              style={{marginTop: '10px'}}>Registrarse</Button>
    </Container>
  );
}

export default LoginForm;
