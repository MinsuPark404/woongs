import React from 'react';
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
              <Route path="videos" element={<Videos />} />
              <Route path="employee" element={<Employee />} />
              <Route path="student" element={<Student />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
