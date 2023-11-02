import React, { useState } from 'react';
import './AdminC.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'
import List from './List'

const AdminC = () => {
    
    return (
        <div className="main-container">
            <Header />


            <div className="content-container">
                <Sidebar />
                <main className="main-content">
                 <List>
                    
                 </List>
                </main>
            </div>
        </div>

    );
};

export default AdminC;
