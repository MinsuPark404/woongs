import React, { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
const MainPage = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    // Adjust the `main-container` class based on the sidebar state
    const mainContainerClass = isSidebarExpanded ? 'main-container expanded' : 'main-container collapsed';


    return (
        <div className={mainContainerClass}>
            <div className="main-container">
                <Header />


                <div className="content-container">
                    <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
                    <main className="main-content">
                        <div className="post post1"></div>
                        <div className="post post2"></div>
                        <div className="post post3"></div>
                        <div className="post post4"></div>
                        <div className="post post5"></div>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
