import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // 이전 메시지 초기화
    try {
      const response = await axios.post('/api/admins/login', {
        admin_email: username,
        admin_password: password,
      });
      // 서버가 성공 메시지를 반환하면 메인 페이지로 네비게이트
      setMessage(response.data.message);
      // 로그인 성공시 session데이터 요청후 데이터 저장
      const sessionData = await axios.post('/api/admins/sessiondata');
      console.log('sessionData', sessionData);
      dispatch({
        type: 'LOGIN',
        name: sessionData.data.admin.name,
        email: sessionData.data.admin.email,
        id: sessionData.data.admin.id,
        roll: sessionData.data.admin.role,
      });
      // redux에 저장된 데이터 확인
      console.log('redux', data)
      navigate('/main');
    } catch (error) {
      // 에러 처리 개선
      if (error.response) {
        // 서버가 반환한 에러 메시지를 표시
        setMessage(error.response.data.message);
      } else {
        // 에러 메시지가 없는 경우 일반 메시지를 표시
        setMessage('로그인 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      }
      console.error('Login error', error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="logo">logo</div>

          <input
            type="text"
            placeholder="ID"
            className="id-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="pw-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-group">
            <button className="btn-login" type="submit">
              Login
            </button>
            {/* "Ask" 버튼의 기능이 명시되지 않았으니 기능을 추가하거나 제거해야 합니다. */}
            <button className="btn-ask" type="button">
              Ask
            </button>
          </div>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
