import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="sidebar">
            <ul className="menu-list">
                <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                    <li>사업자 관리</li>
                </Link>

                <br />
                <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                    <li>메뉴2</li>
                </Link>
                <br />
                <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                    <li>메뉴3</li>
                </Link>
                <br />
                <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                    <li>메뉴4</li>
                </Link>
                <br />
                <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                    <li>메뉴5</li>
                </Link>
            </ul>
            <button className="notification-button">알림 받아보기</button>
            <footer>
                <p>admin_s: 회원관리자</p>
            </footer>
        </aside>
    );
};

export default Sidebar;
