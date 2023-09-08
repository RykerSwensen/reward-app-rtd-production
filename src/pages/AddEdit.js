// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This file is the page to both add or edit a student

// I left off on line 84 adding photo to prevent default

// // Import necessary libraries.
import fireDb from '../firebase'
import React, {useState, useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import './AddEdit.css'
import { toast } from 'react-toastify'


// Initialize initial state.
const initialState = {
    photo: '',
    fName: '',
    lName: '',
    course: '',
    email: '',
    points: '',
}

// Create a function that will be used to add or edit a student.
const AddEdit = () => {
const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {fName, lName, photo, course, email, points, status} = state;
const [selectedImageNames, setSelectedImageNames] = useState([]);
const [file, setFile] = useState(null);
const [progress, setProgress] = useState(0);
const navigate = useNavigate();
const [baseImage, setBaseImage] = useState("");

// Handle input change
const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};


// I am no longer using firebase storage.
// Upload file to storage.
// useEffect(() => {
//     const uploadFile = () => {
//         const name = new Date().getTime() + file.name;
//         const storageRef = ref(storage, `images/${name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on("state_changed", (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setProgress(progress);
//             switch (snapshot.state) {
//                 case "paused":
//                     console.log("Upload is paused");
//                     break;
//                 case "running":
//                     console.log("Upload is running");
//                     break;
//                 default:
//                     break;
//             }
//         }, (error) => {
//             console.log(error);
//         }, 
//         () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 setData((prev) => ({...prev, photo: downloadURL}));
//             });
//         }
//          );
//     };
//     file && uploadFile();
// }, [file]);

// Handle form submit
const handleSubmit = (e) => {
    // const imageRef = ref(storage, "image");
    e.preventDefault();
        if( !photo || !fName || !lName || !course || !email || !points ) {
        toast.error('Please provide value in all fields');
    } else {
        if(!id) {
            fireDb.child('students').push(state, (err) => {
                if(err) {
                    toast.error(err)
                } else {
                    toast.success('Student added successfully')
                }
            });
        } else {
            fireDb.child(`students/${id}`).set(state, (err) => {
                if(err) {
                    toast.error(err)
                } else {
                    toast.success('Student updated successfully')
                }
            });
        }
         setTimeout(() => navigate('/'), 500);
    };
    // uploadBytes(imageRef, image).then(() => {
    //     getDownloadURL(imageRef).then((url) => {
    //         setUrl(url);
    // })
    // .catch((error) => {
    //     console.log(error.message, "Error getting image URL");
    // });
    //  setImage(null);
    // })
    // .catch((error) => {
    //     console.log(error.message);
    // });
    
    // const uploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBaseImage(base64);
    //     console.log(baseImage);
    //   };
    
    // const convertBase64 = (file) => {
    // return new Promise((resolve, reject) => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    
    //     fileReader.onload = () => {
    //         resolve(fileReader.result);
    //     };
    
    //     fileReader.onerror = (error) => {
    //         reject(error);
    //     };
    // });
    // };
    
    // const sendBaseString = (e) => {
    //     handleInputChange(e);
    //     convertBase64(e);
    // }

};

// No longer using firebase storage.
// Handle image upload.
// const handleImageUpload = (e) => {
//     const files = e.target.files;
//     const updatedSelectedImages = [];
//     const updatedSelectedImagesNames = [];
//     for (let i = 0; i < files.length; i++) {
//         updatedSelectedImages.push(files[i]);
//         updatedSelectedImagesNames.push(files[i].name);
//     }
//     setSelectedImages(updatedSelectedImages);
//     setSelectedImageNames(updatedSelectedImagesNames);
// };

// No longer using firebase storage
// Handle upload.
// const handleUpload = async () => {
//     setIsLoading(true);
//     if (selectedImages.length > 0) {
//         for (let i = 0; i < selectedImages.length; i++) {
//             const image = selectedImages[i];
//             const imageRef = ref(storage, image.name);
//             try {
//                 const snapshot = await uploadBytes(imageRef, image);
//                 const downloadUrl = await getDownloadURL(snapshot.ref);

//                 const imagesRef = refren(db, "images");
//                 push(imagesRef, {imageUrl:downloadUrl, timestamp: new Date().getTime()});
//                 console.log("Image uploaded successfully");
//                 setIsLoading(false);
//             } catch (e) {
//                 setIsLoading(false);
//                 console.log('error uploading image: ', e);
//             }
//         }
//     } else {
//         console.log("No images selected");
//         setIsLoading(false);
//     }
// }

// Get the id from the url.
const {id} = useParams();

// Create a function that will be used to get the student by id.
useEffect(() => {
    fireDb.child("students").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            setData({ ...snapshot.val() });
        } else {
            setData({});
        }
    });
    return () => {
        setData({});
    };
}, [id]);
useEffect(() => {
    if(id) {
        setState({...data[id]});
    } else {
        setState({...initialState});
    }
    return () => {
        setState({...initialState});
    }
}, [id, data]);

const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    console.log(baseImage);
  };

const convertBase64 = (file) => {
return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
        reject(error);
    };
});
};

const sendBaseString = (e) => {
    handleSubmit(e);
    convertBase64(e);
}


// Return the form.
  return (
    <div style={{marginTop: "100px"}}>
        <form stle={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center",}}>

            {/* Photos */}
            <label htmlFor="photo">Photo</label>
            <input type="file" id="photo" name="photo"  alt="Base64 Image" placeholder="Base64 Photo" onChange={uploadImage} />

            {/* First Name */}
            <label htmlFor="fName">First Name</label>
            <input type="text" id="fName" name="fName" placeholder="First Name" value={fName || ""} onChange={handleInputChange} />

            {/* Last Name */}
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lName" name="lName" placeholder="Last Name" value={lName || ""} onChange={handleInputChange} />

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Student Email" value={email || ""} onChange={handleInputChange} />

            {/* Points */}
            <label htmlFor="points">Points</label>
            <input type="number" id="points" name="points" placeholder="Total Points" value={points || ""} onChange={handleInputChange} />

            {/* Course */}
            <label htmlFor="fName">Course</label>
            <select type="select" id="course" name="course" placeholder="Student Course" value={course || ""} onChange={handleInputChange}>
                <option onChange={handleInputChange} value="CSE310-01">Please Select the Students Course</option>
                <option onChange={handleInputChange} value="CSE310-01">CSE310-01</option>
                <option onChange={handleInputChange} value="CSE310-02">CSE310-02</option>
                <option onChange={handleInputChange} value="CSE341-A1">CSE341-A1</option>
                <option onChange={handleInputChange} value="CSE341-A4">CSE341-A4</option>
            </select>

            {/* Submit */}
            <input type="submit" value={id ? "Update" : "Add Student"} onClick={sendBaseString} />
            <img src={baseImage} height="200px" />
        </form>
    </div>
  )
}

// Export the AddEdit function.
export default AddEdit

