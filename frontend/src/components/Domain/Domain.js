import React, { useState } from 'react';
// import './Domain.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'
import List from './List'

const Domain = () => {
    
    return (
        <div className="main-container">
            <Header />


            <div className="content-container">
                <Sidebar />
                <main className="main-content">
                <List></List>
                </main>
            </div>
        </div>

    );
};

export default Domain;
