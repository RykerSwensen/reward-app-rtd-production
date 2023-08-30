// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// Header component for the logged in instructors or users of the app.

// Import Statements.
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import "./StudentHeader.css";

// Header uses location to set active page tab.
const StudentHeader = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
    }, [location]);
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?fName=${search}`);
        setSearch("");
    }

    // Return the header component.
  return (
    <div className='header'>
        <p className="logo">Reward App</p>
        <div >
            <form onSubmit={handleSubmit} style={{display: "inline"}}>
                <input type="text" className="inputField" placeholder="Search First Name..." onChange={(e) => setSearch(e.target.value)} value={search} name="search" />
            </form>
        </div>
    </div>
  )
}

// Export the header component.
export default StudentHeader