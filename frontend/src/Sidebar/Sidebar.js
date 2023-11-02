import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate  = useNavigate();
    return (
        <aside className="sidebar">
            <ul className="menu-list">
                <li>메뉴1</li>
                <br />
                <li>메뉴2</li>
                <br />
                <li>메뉴3</li>
                <br />
                <li>메뉴4</li>
                <br />
                <li>메뉴5</li>
            </ul>
            <button className="notification-button">알림 받아보기</button>
            <footer>
                <p>admin_s: 회원관리자</p>
            </footer>
        </aside>
    );
};

export default Sidebar;
