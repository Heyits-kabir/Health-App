// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { userInfo } = useAuth();
  
  // If user is logged in, show the page. Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

//This component checks for userInfo. If it exists, it renders the child route (using <Outlet />).
//  If not, it redirects the user to the login page.