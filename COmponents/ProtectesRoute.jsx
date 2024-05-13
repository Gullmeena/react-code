
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    element={
      isLoggedIn ? (
        <Component />
      ) : (
        <Navigate to="/" replace /> 
      )
    }
  />
);

export default ProtectedRoute;
