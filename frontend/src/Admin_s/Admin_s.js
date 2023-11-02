import React, { useState } from 'react';
import './Admin_s.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

const Admin_s = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ]);

    const deleteUser = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    };

    return (
        <div className="main-container">
            <Header />

            
            <div className="content-container">
                <Sidebar />
                <main className="main-content">
                <div className="admin-panel">

                    <h2>관리자 창</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.name}
                                <button onClick={() => deleteUser(user.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
                </main>
            </div>
        </div>

    );
};

export default Admin_s;
