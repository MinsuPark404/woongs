import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './Header.css';

const Header = () => {
    const data = useSelector((state) => state.user);
    const name = data.name;
    const sampleProfilePic = "https://source.unsplash.com/random";
    const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: '#1976d2',
        },
    },
    });
    const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
        main: '#1976d2',
        },
    },
    });
    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                <Toolbar style={{minHeight : '70px'}}>
                    <div className='header-box'>
                        <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h3">LOGO</Typography>
                        </Link>
                        <Button color="inherit">
                            <Avatar src={sampleProfilePic} alt={name} style={{ marginRight: 10 }} />
                            {name}
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;