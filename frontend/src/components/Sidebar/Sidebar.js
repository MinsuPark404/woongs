import React,{useEffect}from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import './Sidebar.css';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
    // Removed the useState declaration for isExpanded
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const state = location.state;
        if (state?.isSidebarExpanded !== undefined) {
            setIsExpanded(state.isSidebarExpanded);
        }
    }, [location]);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = (path) => {
        if (!isExpanded) {
            navigate(path, { state: { isSidebarExpanded: isExpanded } });
        }else{
            navigate(path, { state: { isSidebarExpanded: isExpanded } });
        }
    };

    const getListItemStyle = (path) => {
        return currentPath === path ? { backgroundColor: '#1976d2', color: 'white' } : null;
    };
    const sidebarClasses = isExpanded ? 'sidebar expanded' : 'sidebar collapsed';
    // 만약 화면이 1100px 이하로 줄어들면 사이드바가 접히도록 설정 아니면 펼쳐지도록 설정
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1100px)');
        const listener = () => {
            if (mediaQuery.matches) {
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
            }
        };
        mediaQuery.addEventListener('change', listener);
        return () => {
            mediaQuery.removeEventListener('change', listener);
        };
    }, [setIsExpanded]);

    return (
        <aside className={sidebarClasses}>
            <div className="sidebar-content">
                <List className="menu-list">
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/admin')} style={getListItemStyle('/main/admin')}>
                        <SettingsIcon />
                        <ListItemText primary="사업자 관리" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/domain')} style={getListItemStyle('/main/domain')}>
                        <LanguageIcon />
                        <ListItemText primary="도메인 관리" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/ad')} style={getListItemStyle('/main/ad')}>
                        <CampaignIcon />
                        <ListItemText primary="홍보 페이지" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/videos')} style={getListItemStyle('/main/videos')}>
                        <VideocamIcon />
                        <ListItemText primary="CCTV 관리" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/employee')} style={getListItemStyle('/main/employee')}>
                        <PersonIcon />
                        <ListItemText primary="직원 관리" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/student')} style={getListItemStyle('/main/student')}>
                        <ChildCareIcon />
                        <ListItemText primary="원생 관리" style={{margin:'10px'}}/>
                    </ListItem>
                    <Divider />
                    <ListItem className="menu-item" onClick={() => handleLinkClick('/main/contact')} style={getListItemStyle('/main/contact')}>
                        <HelpOutlineIcon />
                        <ListItemText primary="문의하기" style={{margin:'10px'}}/>
                    </ListItem>
                </List>
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    <span className="toggle-icon">{isExpanded ? '◀' : '▶'}</span>
                </div>
                {/* 나머지 컴포넌트 코드 */}
                
            </div>
        </aside>
    );
};

export default Sidebar;
