// This file was replaced with AddEdit. This file used validation and 
// redirecting that did not work well with the real time database. 
// However, if this project needs to move to firestore, this works well.

// // Author: Ryker Swensen
// // Last Modified Date: 8/29/2023
// // Owner: Nathan Birch & BYU-Idaho
// // For Use By: BYU-Idaho Faculty and Teacher Assistants.
// // Modyfing the code without the consent of the owner is prohibited and against the honor code.

// // Import necessary libraries.
// import React, {useState, useEffect} from 'react'
// import {Button, Form, Grid, Header, Segment, Loader} from 'semantic-ui-react'
// import {storage, db} from "../firebase"
// import {useParams, useNavigate} from 'react-router-dom'
// import "./AddEdit.css"
// import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


// // Initialize initial state.
// // These are the fields that will be used to create a new student.
// // The fields are empty at first. Hence, the initial state is an empty string.
// const initialState = {
//     photo: '',
//     fName: '',
//     lName: '',
//     email: '',
//     points: '',
//     course: "",
// }

// // Create a function that will be used to add a new student.
// const AddEditStudent = () => {

//     // Initialize the state of the fields to the initial state.
//     const [data, setData] = useState(initialState);
//     const [file, setFile] = useState(null);
//     const [progress, setProgress] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);
//     const {photo, fName, lName, course, email, points,} = data;
//     const navigate = useNavigate();

//     // Upload file to storage.
//     // This will be used to upload the photo of the student.
//     // It will be stored in Firebase Storage.
//     // The file will be uploaded when the file state changes.
//     useEffect(() => {
//         const uploadFile = () => {
//             const name = new Date().getTime() + file.name;
//             const storageRef = ref(storage, `images/${name}`);
//             const uploadTask = uploadBytesResumable(storageRef, file);
//             uploadTask.on("state_changed", (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 setProgress(progress);
//                 switch (snapshot.state) {
//                     case "paused":
//                         console.log("Upload is paused");
//                         break;
//                     case "running":
//                         console.log("Upload is running");
//                         break;
//                     default:
//                         break;
//                 }
//             }, (error) => {
//                 console.log(error);
//             }, 
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setData((prev) => ({...prev, photo: downloadURL}));
//                 });
//             }
//              );
//         };
//         file && uploadFile();
//     }, [file]);

//     // Create a function that will handle the change of the fields.
//     const handleChange = (e) => {
//         setData({...data, [e.target.name]: e.target.value});
//     };

//     // Create a function that will validate the fields.
//     const validate = () => {
//         let errors = {};
//         if(!photo) {
//             errors.photo = "Photo is required";
//         }
//         if(!fName) {
//             errors.fName = "First Name is required";
//         } 
//         if(!lName) {
//             errors.lName = "Last Name is required";
//         }
//         if(!email) {
//             errors.email = "Email is required";
//         }
//         if(!points) {
//             errors.points = "Points is required";
//         }
//         if(!course) {
//             errors.course = "Course is required";
//         }
//         return errors;
//     };

//     // Create a function that will be used to submit the form.
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let errors = validate();
//         if (Object.keys(errors).length) return setErrors(errors);
//         // setIsSubmit(true);
//         //     await addDoc(collection(db, "students"), {
//         //         ...data, 
//         //         timestamp: serverTimestamp()
//         // });
//         // navigate("/studenthome");
//     };


//     // Create the form that will be used to add a new student.
//     // The form will have the following fields:
//     // 1. Photo
//     // 2. First Name
//     // 3. Last Name
//     // 4. Email
//     // 5. Points
//     // 6. Course
//     // 7. Submit Button
//     // The form will be submitted to the database.
//     // The form will be reset after submission.
//     // The form will be used to update a student if the id is not null.
//   return (
//     <div>
//         <Grid>
//             <Grid.Row>
//                 <Grid.Column>
//                     <div>
//                         {isSubmit? (
//                             <Loader active inline="centered" />
//                         ) : (
//                             <>
//                             <h2>Add Student</h2>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Input label="Photo" type="file" placeholder="Photo" name="photo" onChange={(e) => setFile(e.target.files[0])}/>
//                                 <Form.Input label="First Name" error={errors.fName ? {content: errors.fName} : null} placeholder="First Name" name="fName" onChange={handleChange} value={fName}/>
//                                 <Form.Input label="Last Name" error={errors.lName ? {content: errors.lName} : null} placeholder="Last Name" name="lName" onChange={handleChange} value={lName}/>
//                                 <Form.Input label="Email" error={errors.email ? {content: errors.email} : null} placeholder="Email" name="email" onChange={handleChange} value={email}/>
//                                 <Form.Input label="Points" error={errors.points ? {content: errors.points} : null} type="number" placeholder="Points" name="points" onChange={handleChange} value={points}/>
//                                 <Form.Input label="Course" error={errors.course ? {content: errors.course} : null} placeholder="Course" name="course" onChange={handleChange} value={course}/>
//                                 <Button primary type="submit" disabled={progress !== null && progress < 100}>Submit</Button>
//                             </Form>
//                             </>
//                         )}
//                     </div>
//                 </Grid.Column>
//             </Grid.Row>
//         </Grid>
// </div>
//   )
// }

// // Export the function.
// export default AddEditStudent