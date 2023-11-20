import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main';
import Domain from './components/Domain/List';
import Dashboard from './components/Dashboard/Main';
import AdminC from './components/AdminC/List';
import Ad from './components/Ad/AdMain';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  const storeData = store
  return (
    <div>
      <Provider store={storeData}>
        <Routes>
          <Route path="/main" element={<Main />}>
              <Route path="" element={<Dashboard />} />
              <Route path="domain" element={<Domain />} />
              <Route path="admin" element={<AdminC />} />
              <Route path="ad" element={<Ad />} />
            </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
