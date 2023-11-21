import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';
import { useState } from 'react';
import './main.css';
import { Outlet } from 'react-router-dom';

function Main() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  return (
    <div className='main-container'>
        <Header/>
        <div className='sidebar-n-contents'>
          <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
          <div className="admin-panel">

            <Outlet />
          </div>
        </div>
        
    </div>
  );
}

export default Main;