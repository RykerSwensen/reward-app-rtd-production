// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// Import necessary libraries.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// Create a protected route.
const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  // If the user is not logged in, redirect to the home page.
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

// Export the protected route.
export default ProtectedRoute;