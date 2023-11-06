import React, { useState } from 'react';
import { AppBar, Toolbar, Container, Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

function Header({ showCategory = false, category, setCategory }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleResetMenuClick = (event) => {
        setCategory(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="left" alignItems="center">
                        <Button color="inherit" component={Link} to="/" onClick={handleResetMenuClick}>
                            <Typography variant="h6" component="div">
                                Aprende YA
                            </Typography>
                        </Button>
                        {showCategory ?
                            <Button color="inherit" onClick={handleMenuClick} style={{ marginLeft: '40px' }}>
                            Categorías
                        </Button> : null}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem
                                selected={category === 'Desarrollo Web'}
                                onClick={() => handleCategorySelect('Desarrollo Web')}
                            >
                                Desarrollo Web
                            </MenuItem>
                            <MenuItem
                                selected={category === 'Diseño'}
                                onClick={() => handleCategorySelect('Diseño')}
                            >
                                Diseño
                            </MenuItem>
                            <MenuItem
                                selected={category === 'Marketing'}
                                onClick={() => handleCategorySelect('Marketing')}
                            >
                                Marketing
                            </MenuItem>
                        </Menu>
                    </Box>
                </Container>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="right" alignItems="center">
                        <Button color="inherit" component={Link} to="/">
                            Mis Cursos
                        </Button>
                        <Button color="inherit" component={Link} to="/nuevo-curso" style={{ marginLeft: '30px' }}>
                            Crear Curso
                        </Button>
                        <Button color="inherit" component={Link} to="/login" style={{ marginLeft: '30px' }}>
                            Mi Perfil
                        </Button>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;