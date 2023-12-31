import React, { useState } from 'react';
import Header from './Header/Header'; // 가정된 Header 컴포넌트
import Sidebar from './Sidebar/Sidebar'; // 가정된 Sidebar 컴포넌트
import { Outlet } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar} from '@mui/material';


// Drawer와 AppBar 스타일링
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// Main 컴포넌트
function Main() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box 
      sx={{ 
        display: 'flex',
        backgroundColor: '#e7e7e8',
        }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Header toggleDrawer={toggleDrawer} open={open} />
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Sidebar toggleDrawer={toggleDrawer} open={open} />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {/* 메인 콘텐츠 */}
          <Outlet />
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default Main;