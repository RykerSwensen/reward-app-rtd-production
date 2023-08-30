// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This is the router of the application

// Import necessary libraries.
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Search from './pages/Search';
import StudentHome from './pages/StudentHome';
import ProtectedRoute from './components/ProtectedRoute';
import Account from './components/Account';
import Signin from './components/Signin';
import { AuthContextProvider } from './context/AuthContext';
import StudentHeader from './components/StudentHeader';

// Return the router.
function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <StudentHeader/>
      <Header/>
      <div className="App">
        <ToastContainer position='top-center'/>
        <Routes>
        <Route path="/" element={<StudentHome/>}/>
          <Route path="/search" element={<Search />}/>
          <Route path='/signin' element={<Signin />} />
          <Route path="/update/:id" element={<AddEdit />}/>
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/add" element={<ProtectedRoute><AddEdit /></ProtectedRoute>}/>
          <Route path="/view/:id" element={<ProtectedRoute><View /></ProtectedRoute>}/>
          {/* <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>}/> */}
          <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          {/* Only For Testing Purposes
          <Route path='/signin' element={<ProtectedRoute><Header/><Signin /></ProtectedRoute>} /> */}
        </Routes>
      </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

// Export the router.
export default App;
