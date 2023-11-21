import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';
import { useState } from 'react';
import './main.css';
// import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
// import axios from '../axios';

function Main() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    // const [session , setSession] = useState(null);
    // useEffect(() => {
    //   axios.post('/api/admins/sessiondata')
    //   .then(res => {
    //     setSession(res.data);
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // },[]);
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