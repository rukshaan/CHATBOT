import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';

import { GET_USER_INFO } from './lib/utils/constants';
import apiClient from './lib/utils/apiClient';
import { useAppStore } from './store/index.js';

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  //  Protect routes based on auth state
  const PrivateRoute = ({ children }) => {
    return userInfo ? children : <Navigate to="/auth" />;
  };

  const AuthRoute = ({ children }) => {
    return userInfo ? <Navigate to="/chat" /> : children;
  };

  if (loading) {
    return <div>Loading...</div>; // You can add a fancy spinner here
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
