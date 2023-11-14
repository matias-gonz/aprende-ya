import React from 'react';
import {AppBar, Box, Button, Link, Toolbar} from '@mui/material';

import './NavBar.css';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    const {isUserLoggedIn} = props;
    this.state = {
      isUserLoggedIn: isUserLoggedIn,
    };
  }

  render() {
    const {isUserLoggedIn} = this.state;

    return (
      <AppBar className={"NavBar"}>
        <Toolbar className={"NavBar-toolbar"} disableGutters={true}>
          <Box className={"NavBar-title-container"}>
            <Link href={"/"} variant={"h3"} className={"NavBar-title"}>AprendeYA</Link>
          </Box>
          <Box className={"NavBar-button-container"}>
            {!isUserLoggedIn && (
              <Link href="/login" style={{textDecoration: 'none'}}>
                <Button className={"NavBar-button"} variant={"contained"}>Ingresar</Button>
              </Link>
            )}
            {isUserLoggedIn && (
              <Link href="/nuevo-curso" style={{textDecoration: 'none'}}>
                <Button className={"NavBar-button"} variant={"contained"}>Crear curso</Button>
              </Link>
            )}
            {isUserLoggedIn && (
              <Link href="/perfil" style={{textDecoration: 'none'}}>
                <Button className={"NavBar-button"} variant={"contained"}>Mi perfil</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    )
      ;
  }
}

export default NavBar;
