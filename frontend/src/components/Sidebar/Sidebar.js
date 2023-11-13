import React,{useEffect}from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faGlobe, faBullhorn } from '@fortawesome/free-solid-svg-icons';
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

    return (
        <aside className={sidebarClasses}>
            <div className="sidebar-content">
                <ul className="menu-list">
                    {/* 메뉴 아이템들 */}
                    <li className="menu-item" onClick={() => handleLinkClick('/admin')}>
                        <FontAwesomeIcon className="fa-icon" icon={faUserGear} />
                        {isExpanded && <span>사업자 관리</span>}
                    </li>
                    <br />
                    <li className="menu-item" onClick={() => handleLinkClick('/domain')}>
                        <FontAwesomeIcon className="fa-icon" icon={faGlobe} />
                        {isExpanded && <span>도메인 관리</span>}
                    </li>
                    <br />
                    <li className="menu-item" onClick={() => handleLinkClick('/ad')}>
                        <FontAwesomeIcon className="fa-icon" icon={faBullhorn} />
                        {isExpanded && <span>홍보 페이지</span>}
                    </li>
                    <br />
                    {/* 기타 링크 아이템들에도 같은 로직 적용 */}
                </ul>
            </div>
            <div className="sidebar-toggle" onClick={toggleSidebar}>
                <span className="toggle-icon">{isExpanded ? '◀' : '▶'}</span>
            </div>
        </aside>
    );
};

export default Sidebar;
