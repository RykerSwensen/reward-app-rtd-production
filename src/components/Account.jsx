// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This component is used to display who is logged in, and a logout button.

// Import necessary libraries.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// Create the Account component.
// This component is used to display the user's email and a logout button.
const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  // This function is used to logout the user.
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

// Return the JSX for the Account component.
  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>
    </div>
  );
};

// Export the Account component.
export default Account;