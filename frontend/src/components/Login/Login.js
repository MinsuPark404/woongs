import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('뭐가  문제냐 ')
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            navigate('/main');
            setMessage(response.data.message);
        } catch (error) {
            console.error('Login error', error);
            setMessage('An error occurred while logging in');
        }
    };

    return (
        
            <div className="login-wrapper">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="logo">logo</div>

                    <input type="text" placeholder="ID" className="id-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" className="pw-input" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className="button-group">
                        <button className="btn-login" type="submit">Login</button>
                        <button className="btn-ask">Ask</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
            
        
            </div>

            
    );
}

export default Login;
