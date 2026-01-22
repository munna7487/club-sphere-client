import React from 'react';
import { Navigate, } from 'react-router-dom';

import Userole from '../hooks/Userole';
import UseAuth from '../hooks/UseAuth';
import { useLocation } from 'react-router';


const DashboardRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = Userole();
  const location = useLocation();

  if (loading || isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in but normal user
  if (role !== 'admin' && role !== 'manager') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default DashboardRoute;
