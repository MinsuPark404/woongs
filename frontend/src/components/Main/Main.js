import React, { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
const MainPage = () => {


    return (
        <div className="main-container">
            <Header />

            
            <div className="content-container">
                <Sidebar />
                <main className="main-content">
                    <div className="post post1"></div>
                    <div className="post post2"></div>
                    <div className="post post3"></div>
                    <div className="post post4"></div>
                    <div className="post post5"></div>

                </main>
            </div>
        </div>
    );
}

export default MainPage;
