// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This is the homepage for the logged in users

// Import necessary libraries.
import fireDb from '../firebase'
import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'
import {toast} from 'react-toastify'
import {Image} from "semantic-ui-react";
import {db} from "../firebase";
import { onSnapshot, collection } from 'firebase/firestore';

// Create the homepage component.
const Home = () => {
const [users, setUsers] = useState([]);
const [data, setData] = useState({})
const [sortedData, setSortedData] = useState([])
const [sort, setSort] = useState(false)
const [loading, setLoading] = useState(false);
const [imageUrls, setImageUrls] = useState([]);
const navigate = useNavigate();


// Get the data from the database.
useEffect(() => {
    setLoading(true);
    fireDb.child('students').on('value', snapshot => {
        let list = [];
        if(snapshot.val() !== null) {
            
                setData({...snapshot.val()});
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        }
    }, []); 

// Get the data from the database.
useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "students"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()});
        });
        setUsers(list);
        setLoading(false);
    }, (error) => {
        console.log(error);
    });
    return () => {
        unsub();
    };
}, []);

// Delete a student.
const onDelete = (id) => {
    if(window.confirm('Are you sure to delete this student?')) {
        fireDb.child(`students/${id}`).remove((err) => {
            if(err) {
                toast.error(err);
            } else {
                toast.success('Student deleted successfully');
            }
        })
    }
}

// Sort the data.
const handleChange = (e) => {
    setSort(true);
    fireDb.child('students').orderByChild(`${e.target.value}`).on('value', snapshot => {
        let sortedData = [];
        snapshot.forEach((snap) => {
            sortedData.push(snap.val());
        });
        setSortedData(sortedData);
    });
};

// Reset the data.
const handleReset = () => {
    setSort(false);
    fireDb.child('students').on('value', snapshot => {
        if(snapshot.val() !== null) {
                setData({...snapshot.val()});
            } else {
                setData({});
            }
        });
};

// Filter the data.
const filterData = (value) => {
    fireDb.child('students').orderByChild('course').equalTo(value).on('value', (snapshot) => {
        if(snapshot.val()) {
            const data = snapshot.val();
            setData(data);
        }
    });
}

// Return the homepage.
  return (
    <div >
        <div>
            {imageUrls.map((image, index) => {
                return (
                    <div>
                        <img src={image} alt="" key={index} />
                    </div>
                );

            })};
        </div>

        {/* Create a table that will display the data. */}
        <div style={{marginTop: '100px'}}>
            <table className="styled-table">
                <thead>
                    {users && users.map((item) => (
                        <Image src={item.img} size="small" style={{ width: "20%", borderRadius: "50%",}} />
                    ))}
                    
                    {/* create table header */}
                    <tr>
                        <th style={{textAlign: 'center'}}>No.</th>
                        <th style={{textAlign: 'center'}}>Photo</th>
                        <th style={{textAlign: 'center'}}>First Name</th>
                        <th style={{textAlign: 'center'}}>Last Name</th>
                        <th style={{textAlign: 'center'}}>Course Code</th>
                        <th style={{textAlign: 'center'}}>Email</th>
                        <th style={{textAlign: 'center'}}>Points</th>
                        {!sort && <th style={{textAlign: 'center'}}>Action</th>}
                    </tr>
                </thead>

                {/* If user is not sorting, display tbody with data. Default. */}
                {!sort && (
                    <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{users && users.map((item) => (
                        <Image src={item.img} size="small" style={{ width: "20%", borderRadius: "50%",}} />
                    ))}</td>
                                <td>{data[id].fName}</td>
                                <td>{data[id].lName}</td>
                                <td>{data[id].course}</td>
                                <td>{data[id].email}</td>
                                <td>{data[id].points}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                                    <Link to={`/view/${id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                )}

            {/* If user is sorting, display sorted data. */}
            {sort && (
                <tbody>
                    {sortedData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                {/* <td key={item.id}>
                                <Image src={item.img} size="small" style={{ width: "20%", borderRadius: "50%",}} />
                                </td> */}
                                <td>{item.photo}</td>
                                <td>{item.fName}</td>
                                <td>{item.lName}</td>
                                <td>{item.course}</td>
                                <td>{item.email}</td>
                                <td>{item.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
            </table>

            {/* sort */}
            <label>Sort By:</label>
            <select className='dropdown' name='colValue' onChange={handleChange}>
                <option>Please Select</option>
                <option value="fName">First Name</option>
                <option value="lName">Last Name</option>
                <option value="course">Course Code</option>
                <option value="points">Points</option>
            </select>

            {/* reset */}
            <button className='btn btn-reset' onClick={handleReset}>Reset</button>
            <br />

            {/* filter */}
            <label>Course</label>
            <button className='btn btn-active' onClick={() => filterData('CSE310-01')}>CSE310-01</button>
            <button className='btn btn-active' onClick={() => filterData('CSE310-02')}>CSE310-02</button>
            <button className='btn btn-active' onClick={() => filterData('CSE341-A1')}>CSE341-A1</button>
            <button className='btn btn-active' onClick={() => filterData('CSE341-A4')}>CSE341-A4</button>
        </div>
    </div>
  );
};

// Export the homepage.
export default Home