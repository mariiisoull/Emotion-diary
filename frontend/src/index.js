import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Chart from './pages/Chart';
import Tegs from './pages/Tegs';

import Profile from './pages/Profile';
import Pincode from './pages/Pincode';
import Notification from './pages/Notification';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings/>}/>
          <Route path="/chart" element={<Chart/>}/>
          <Route path="/tegs" element={<Tegs/>}/>

          <Route path="/profile" element={<Profile/>}/>
          <Route path="/pincode" element={<Pincode/>}/>
          <Route path="/notification" element={<Notification/>}/>

    
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
