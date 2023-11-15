import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Domain from './components/Domain/List';
import Dashboard from './components/Dashboard/Main';
import AdminC from './components/AdminC/List';
import Ad from './components/Ad/AdMain';
const queryClient = new QueryClient();
function App() {
  return (
    <div>
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/main" element={<Main />}>
              <Route path="" element={<Dashboard />} />
              <Route path="domain" element={<Domain />} />
              <Route path="admin" element={<AdminC />} />
              <Route path="ad" element={<Ad />} />
            </Route>
          <Route path="/" element={<Login />} />
        </Routes>
    </QueryClientProvider>
    </div>
  );
}

export default App;
