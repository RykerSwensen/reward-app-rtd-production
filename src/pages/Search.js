// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This file is the search page for the app.

// Import necessary libraries.
import React, {useState, useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'
import fireDb from "../firebase";
import "./Search.css"

// Create the search page.
const Search = () => {
    const [data, setData] = useState({});
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let search = query.get('fName');
    console.log("search", search);
    useEffect(() => {
        searchData();
    }, [search]);
    const searchData = () => {
        fireDb.child('students').orderByChild('fName').equalTo(search).on("value", (snapshot) => {
            if(snapshot.val()) {
                const data = snapshot.val();
                setData(data)
            } 
        })
    }

// Return the search page.
  return (
    <>
        <div style={{marginTop: '100px'}}>
            <Link to="/">
                <button className="btn btn-edit">Back To Home</button>
            </Link>
            {Object.keys(data).length === 0 ? (
                <h2>No Students Found With the Search : {query.get("fName")}</h2>
            ): (
                <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: 'center'}}>No.</th>
                        <th style={{textAlign: 'center'}}>Photo</th>
                        <th style={{textAlign: 'center'}}>First Name</th>
                        <th style={{textAlign: 'center'}}>Last Name</th>
                        <th style={{textAlign: 'center'}}>Course Code</th>
                        <th style={{textAlign: 'center'}}>Email</th>
                        <th style={{textAlign: 'center'}}>Points</th>
                        <th style={{textAlign: 'center'}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{data[id].photo}</td>
                                <td>{data[id].fName}</td>
                                <td>{data[id].lName}</td>
                                <td>{data[id].course}</td>
                                <td>{data[id].email}</td>
                                <td>{data[id].points}</td>
                                <td>{data[id].status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            )}
        </div>
    </>
  )
}

// Export the search page.
export default Search