// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { userInfo } = useAuth();
  
  // Check if user is logged in and if their role is 'admin'
  return userInfo && userInfo.role === 'admin' ? (
    <Outlet /> // If yes, render the child component/page
  ) : (
    <Navigate to="/login" replace /> // If no, redirect to the login page
  );
};

export default AdminRoute;