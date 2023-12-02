import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import './Header.css'
const Header = () => {
    const name = "User Name";
    const sampleProfilePic = "https://source.unsplash.com/random";

    return (
        <AppBar position="static">
            <Toolbar style={{ minHeight: '70px' }}>
                <IconButton color="inherit" edge="start" sx={{ marginRight: '36px' }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
                    <img style={{width: 50, height:50}} src='https://i.imgur.com/vdPp1yM.png'/>
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={2} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Button color="inherit">
                    <Avatar src={sampleProfilePic} alt={name} style={{ marginRight: 10 }} />
                    {name}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
