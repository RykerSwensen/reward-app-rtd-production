// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// Header component for the logged in instructors or users of the app.

// Import Statements.
import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import "./Header.css";

// Header uses location to set active page tab.
const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("StudentHome");
        } else if(location.pathname === "/add") {
            setActiveTab("AddContact");
        // } else if(location.pathname === "/about") {
        //     setActiveTab("About");
        } else if(location.pathname === "/home") {
            setActiveTab("Home");
        // } else if(location.pathname === "/signup") {
        //     setActiveTab("SignUp");
            } else if(location.pathname === "/signin") {
            setActiveTab("SignIn");
        } else if(location.pathname === "/account") {
            setActiveTab("Account");
        }
    }, [location]);


    // Return the header component.
  return (
    <div className='header'>
        <div className="header-right">
            <Link to="/">
                <p className={`${activeTab === 'StudentHome' ? 'active' : ''}`} onClick={() => setActiveTab("StudentHome")}>
                    StudentHome
                </p>
            </Link>
            <Link to="/home">
                <p className={`${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/add">
                <p className={`${activeTab === 'AddContact' ? 'active' : ''}`} onClick={() => setActiveTab("AddContact")}>
                    Add Student
                </p>
            </Link>
            {/* <Link to="/about">
                <p className={`${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab("About")}>
                    About
                </p>
            </Link> */}
            {/* SignUp is only for testing purposes. */}
            {/* <Link to="/signup">
                <p className={`${activeTab === "SignUp" ? "active" : ""}`} onClick={() => setActiveTab("SignUp")}>
                    Signup
                </p>
            </Link> */}
            <Link to="/signin">
                <p className={`${activeTab === "SignIn" ? "active" : ""}`} onClick={() => setActiveTab("SignIn")}>
                    SignIn
                </p>
            </Link>
            <Link to="/account">
                <p className={`${activeTab === "Account" ? "active" : ""}`} onClick={() => setActiveTab("Account")}>
                    Account
                </p>
            </Link>
        </div>
    </div>
  )
}

// Export the header component.
export default Header