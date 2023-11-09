import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import AdminC from './components/AdminC/AdminC';
import Domain from './components/Domain/Domain';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<AdminC />} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
