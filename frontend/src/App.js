import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import Main from './components/Main/Main';
import AdminC from './components/AdminC/AdminC';
import Domain from './components/Domain/Domain';
import Ad from './components/Ad/AdMain'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<AdminC />} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/ad" element={<Ad />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
