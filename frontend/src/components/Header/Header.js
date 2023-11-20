import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const data = useSelector((state) => state.user);
    const name = data.name;
    return (
        <header>
            <Link to="/main" style={{ textDecoration: 'none', color: 'black' }}>
                <h1>LOGO</h1>
            </Link>
            <button className="search-button">{name}</button>
        </header>
    );
};

export default Header;
