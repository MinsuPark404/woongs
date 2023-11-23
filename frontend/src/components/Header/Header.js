import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const Header = ({ toggleDrawer, open }) => {
    const data = useSelector((state) => state.user);
    const name = data.name;
    const sampleProfilePic = "https://source.unsplash.com/random";

    return (
        <AppBar position="static">
            <Toolbar style={{ minHeight: '70px' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/main" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                        LOGO
                    </Typography>
                </Link>
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