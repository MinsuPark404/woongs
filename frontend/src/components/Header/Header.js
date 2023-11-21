import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import './Header.css';

const Header = () => {
    const data = useSelector((state) => state.user);
    const name = data.name;
    const sampleProfilePic = "https://source.unsplash.com/random";
    return (
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
    );
};

export default Header;