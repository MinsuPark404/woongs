import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = ({ toggleDrawer, open }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLinkClick = (path) => {
        navigate(path);
        if (!open) {
            toggleDrawer();
        }
    };

    const getListItemStyle = (path) => {
        return currentPath === path ? { backgroundColor: '#1976d2', color: 'white' } : null;
    };

    return (
        <div style={{
            // backgroundColor : "#283B42",
            height : '100vh',
            }}>
            <IconButton onClick={toggleDrawer} style={{height : '70px'}}>
                <ChevronLeftIcon />
            </IconButton>
            <List style={{padding:'10px'}}>
                <ListItem 
                button
                onClick={() => handleLinkClick('/main')}
                style={getListItemStyle('/main')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                    <ListItemText primary="대시보드" />
                </ListItem>
            </List>
            <Divider />
            <List style={{padding:'10px'}}>
                <ListItem button 
                onClick={() => handleLinkClick('/main/admin')} 
                style={getListItemStyle('/main/admin')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="사업자 관리" />
                </ListItem>
                <Divider />
                <ListItem button 
                onClick={() => handleLinkClick('/main/domain')} 
                style={getListItemStyle('/main/domain')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><LanguageIcon /></ListItemIcon>
                    <ListItemText primary="도메인 관리" />
                </ListItem>
                <Divider />
                <ListItem button 
                onClick={() => handleLinkClick('/main/ad')} 
                style={getListItemStyle('/main/ad')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><CampaignIcon /></ListItemIcon>
                    <ListItemText primary="홍보 페이지" />
                </ListItem>
                <Divider />
                <ListItem button 
                onClick={() => handleLinkClick('/main/videos')} 
                style={getListItemStyle('/main/videos')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><VideocamIcon /></ListItemIcon>
                    <ListItemText primary="CCTV 관리" />
                </ListItem>
                <Divider />
                <ListItem button
                onClick={() => handleLinkClick('/main/employee')} 
                style={getListItemStyle('/main/employee')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="직원 관리" />
                </ListItem>
                <Divider />
                <ListItem button 
                onClick={() => handleLinkClick('/main/student')} 
                style={getListItemStyle('/main/student')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><ChildCareIcon /></ListItemIcon>
                    <ListItemText primary="원생 관리" />
                </ListItem>
                <Divider />
                <ListItem button 
                onClick={() => handleLinkClick('/main/contact')} 
                style={getListItemStyle('/main/contact')}
                sx={{height:'70px'}}
                >
                    <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                    <ListItemText primary="문의하기" />
                </ListItem>
                <Divider />

            </List>
        </div>
    );
};

export default Sidebar;