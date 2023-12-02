import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import axios from '../../axios';

const Header = ({ toggleDrawer, open }) => {
    const data = useSelector((state) => state.user);
    const name = data.name;
    const [anchorEl, setAnchorEl] = useState(null);
    const nav = useNavigate();

    const sampleProfilePic = "https://source.unsplash.com/random";


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axios.post('/api/admins/logout');
        handleCloseMenu();
        nav('/');
    };

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
                        KinderGuard
                    </Typography>
                </Link>
                <IconButton color="inherit">
                    <Badge badgeContent={2} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Button color="inherit" onClick={handleMenu}>
                    <Avatar src={sampleProfilePic} alt={name} style={{ marginRight: 10 }} />
                    {name}
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleCloseMenu}>내 정보 수정</MenuItem>
                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;