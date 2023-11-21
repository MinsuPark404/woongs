import React,{useEffect}from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faGlobe, faBullhorn, faQuestionCircle, faUser, faVideo, faChild } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
    // Removed the useState declaration for isExpanded
    const navigate = useNavigate();
    const location = useLocation();

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
                <ul className="menu-list">
                    {/* 메뉴 아이템들 */}
                    <li className="menu-item" onClick={() => handleLinkClick('/main/admin')}>
                        <FontAwesomeIcon className="fa-icon" icon={faUserGear} />
                        {isExpanded && <span>사업자 관리</span>}
                    </li>
                    <br />
                    <li className="menu-item" onClick={() => handleLinkClick('/main/domain')}>
                        <FontAwesomeIcon className="fa-icon" icon={faGlobe} />
                        {isExpanded && <span>도메인 관리</span>}
                    </li>
                    <br />
                    <li className="menu-item" onClick={() => handleLinkClick('/main/ad')}>
                        <FontAwesomeIcon className="fa-icon" icon={faBullhorn} />
                        {isExpanded && <span>홍보 페이지</span>}
                    </li>
                    <br />
                    <li className="menu-item" onClick={() => handleLinkClick('/main/videos')}>
                        <FontAwesomeIcon className="fa-icon" icon={faVideo} />
                        {isExpanded && <span>CCTV 관리</span>}
                    </li>
                    <br />
                    {/* 직원관리 */}
                    <li className="menu-item" onClick={() => handleLinkClick('/main/employee')}>
                        <FontAwesomeIcon className="fa-icon" icon={faUser} />
                        {isExpanded && <span>직원 관리</span>}
                    </li>
                    <br />
                    {/* 원생관리 */}
                    <li className="menu-item" onClick={() => handleLinkClick('/main/student')}>
                        <FontAwesomeIcon className="fa-icon" icon={faChild} />
                        {isExpanded && <span>원생 관리</span>}
                    </li>
                    <br />
                    {/* 문의하기 */}
                    <li className="menu-item" onClick={() => handleLinkClick('/main/contact')}>
                        <FontAwesomeIcon className="fa-icon" icon={faQuestionCircle} />
                        {isExpanded && <span>문의하기</span>}
                    </li>
                    <br />
                        
                </ul>
                <br />
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                <span className="toggle-icon">{isExpanded ? '◀' : '▶'}</span>
            </div>
            </div>
            
        </aside>
    );
};

export default Sidebar;
