import React from 'react';
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
import { useSelector } from 'react-redux';

const Sidebar = ({ toggleDrawer, open }) => {
  const userRole = useSelector((state) => state.user.role);
  console.log('사이드데이터:', userRole);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const superAdminMenu = [
    { path: '/main', icon: <DashboardIcon />, text: '대시보드' },
    { path: '/main/admin', icon: <SettingsIcon />, text: '사업자 관리' },
    { path: '/main/domain', icon: <LanguageIcon />, text: '도메인 관리' },
  ];

  const adminMenu = [
    { path: '/main', icon: <DashboardIcon />, text: '대시보드' },
    { path: '/main/ad', icon: <CampaignIcon />, text: '홍보 페이지' },
    { path: '/main/videos', icon: <VideocamIcon />, text: 'CCTV 관리' },
    { path: '/main/employee', icon: <PersonIcon />, text: '직원 관리' },
    { path: '/main/student', icon: <ChildCareIcon />, text: '원생 관리' },
    { path: '/main/board', icon: <HelpOutlineIcon />, text: '게시판' },
  ];

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
    <div style={{ height: '100vh' }}>
      <IconButton onClick={toggleDrawer} style={{ height: '70px' }}>
        <ChevronLeftIcon />
      </IconButton>
      {userRole && ( // userRole이 undefined가 아닐 때만 렌더링
        <List style={{ padding: '10px' }}>
          {(userRole === '슈퍼관리자' ? superAdminMenu : adminMenu).map((menu) => (
            <React.Fragment key={menu.path}>
              <ListItem button onClick={() => handleLinkClick(menu.path)} style={getListItemStyle(menu.path)} sx={{ height: '70px' }}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
};

export default Sidebar;
