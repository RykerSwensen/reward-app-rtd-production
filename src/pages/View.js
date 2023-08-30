// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This is the page that logged in users will see when the click the "view" button on the home page.

// Import necessary libraries.
import React, {useState, useEffect} from 'react'
import fireDb from "../firebase";
import {useHistory, useParams, Link} from 'react-router-dom'
import './View.css'

// Create the view component.
const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();

  // Get the data from the database.
  useEffect(() => {
    fireDb.child(`students/${id}`).get().then((snapshot) => {
      if(snapshot.exists()) {
        setUser({...snapshot.val()})
      } else {
        setUser({})
      }
    })
  }, [id]);
  console.log(user);

  // Return the view page.
  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Student Details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Points:</strong>
          <span>{user.points}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Export the view component.
export default View