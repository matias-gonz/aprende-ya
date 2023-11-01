import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="left" alignItems="center">
                        <Typography variant="h6" component="div">
                            Aprende YA
                        </Typography>
                    </Box>
                </Container>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="right" alignItems="center">
                        <Button color="inherit" component={Link} to="/">
                            Cursos
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Mi Perfil
                        </Button>
                        <Button color="inherit" component={Link} to="/nuevo-curso">
                            Agregar Curso
                        </Button>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;