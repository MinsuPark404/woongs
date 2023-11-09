import React, { useState, useEffect } from 'react';
import './AdminC.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'
import List from './List'

const AdminC = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    // Adjust the `main-container` class based on the sidebar state
    const mainContainerClass = isSidebarExpanded ? 'main-container expanded' : 'main-container collapsed';

    return (
        <div className={mainContainerClass}>
            <Header />
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
            <div className="content-container">
                <main className="main-content">
                    <List>
                        {/* List component content */}
                    </List>
                </main>
            </div>
        </div>
    );
};

export default AdminC;