import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/main" style={{ textDecoration: 'none', color: 'black' }}>
                <h1>LOGO</h1>
            </Link>
            <button className="search-button">로그인(회원정보)</button>
        </header>
    );
};

export default Header;
