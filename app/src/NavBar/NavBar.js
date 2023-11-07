import React from 'react';
import {AppBar, Box, Button, InputAdornment, Link, TextField, Toolbar, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <AppBar className={"NavBar"}>
        <Toolbar className={"NavBar-toolbar"} disableGutters={true}>
          <Box className={"NavBar-title-container"}>
            <Typography variant={"h3"} className={"NavBar-title"}>ubademy</Typography>
          </Box>
          <TextField
            className={"NavBar-search"}
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
              style: {borderRadius: '4rem'}
            }}
          />
          <Box className={"NavBar-button-container"}>
            <Link href="/login" style={{textDecoration: 'none'}}>
              <Button className={"NavBar-button"} variant={"contained"}>Ingresar</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
