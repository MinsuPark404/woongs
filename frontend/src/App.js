import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Login from './Login/Login';
import Main from './Main/Main';
import Admin_s from './Admin_s/Admin_s';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<Admin_s />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
