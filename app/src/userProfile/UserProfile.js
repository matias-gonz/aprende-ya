import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Email, Lock, Person } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios'; // Import Axios

function UserProfile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  
  useEffect(() => {
    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/user/${user_id}`;

    axios.get(apiUrl, { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data: ', error));
  }, []); // Empty dependency array to execute the effect only once

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/user/${user_id}`;

    axios.put(apiUrl, user, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        alert('User data has been saved successfully.');
      })
      .catch((error) => console.error('Error saving user data: ', error));
  };
  const handleDeleteUser = () => {
    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/user/${user_id}`;
    axios.delete(apiUrl, user, { withCredentials: true })
    .then((response) => {
      if (window.confirm('Usuario borrado con éxito. ¿Desea redirigir a la página de inicio?')) {
        return <Navigate to="/login" />;
      }
    })
      .catch((error) => {
        alert('Error al eliminar usuario');
        console.error('Error deleting user: ', error);
      });
  };
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" elevation={0}>
        <div>
          <Typography variant="h4" style={{ fontFamily: 'arial', marginTop: '20px' }}> Mi Perfil </Typography>
          <form>
            <TextField
              label="Nombre"
              fullWidth
              variant="outlined"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              disabled={!isEditing}
              style={{ marginTop: '20px' }}
              InputProps={{
                startAdornment: <Person />,
              }}
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={!isEditing}
              style={{ marginBottom: '20px', marginTop: '20px' }}
              InputProps={{
                startAdornment: <Email />,
              }}
            />
            <TextField
              label="Contraseña"
              fullWidth
              variant="outlined"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              disabled={!isEditing}
              style={{ marginBottom: '20px' }}
              InputProps={{
                startAdornment: <Lock />,
              }}
            />
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Editar
              </Button>
            )}
          </form>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            style={{
              marginTop: '20px',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            Cerrar Sesión
          </Button>
          </div>
          <div>
            <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteUser}
            style={{
              marginTop: '20px',
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            Eliminar usuario
          </Button>
        
        </div>
      </Container>
    </div>
  );
}

export default UserProfile;
