import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main';
import Domain from './components/Domain/List';
import Dashboard from './components/Dashboard/Main';
import AdminC from './components/AdminC/List';
import Ad from './components/Ad/AdMain';
import Videos from './components/Videos/Videos';
import Employee from './components/Employee/Employee';
import Student from './components/Student/Student';
import Contact from './components/Contact/Contact';
import Board from './components/Board/BoardList';
import WriteBoard from './components/Board/Board';
import BoardDetail from './components/Board/BoardDetail';
import store from './store';
import { Provider } from 'react-redux';

const SessionCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 가져오기
    const storedUserData = sessionStorage.getItem('user');
    console.log('세션 데이터: ', storedUserData);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Redux 스토어에 사용자 데이터 저장
      dispatch({
        type: 'LOGIN',
        payload: userData
      });
    }
  }, [dispatch]);

  return null; // UI를 렌더링하지 않는 컴포넌트
};


function App() {
  // const storeData = store
  return (
    <div>
      <Provider store={store}>
        <SessionCheck/>
        <Routes>
          <Route path="/main" element={<Main />}>
              <Route path="" element={<Dashboard />} />
              <Route path="domain" element={<Domain />} />
              <Route path="admin" element={<AdminC />} />
              <Route path="ad" element={<Ad />} />
              <Route path="videos" element={<Videos />} />
              <Route path="employee" element={<Employee />} />
              <Route path="student" element={<Student />} />
              <Route path="contact" element={<Contact />} />
              <Route path="board"  element={<Board/>}/>
            <Route path="write" element={<WriteBoard />} />
            <Route path="board-detail/:id" element={<BoardDetail />} />
            </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;