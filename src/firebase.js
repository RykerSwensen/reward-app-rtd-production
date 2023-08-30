// Author: Ryker Swensen
// Last Modified Date: 8/30/2023
// Owner: Nathan Birch & BYU-Idaho
// For Use By: BYU-Idaho Faculty and Teacher Assistants.
// Modyfing the code without the consent of the owner is prohibited and against the honor code.

// This file is the firebase configuration file.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import firebase from "firebase/compat/app";
import database from "firebase/compat/database";
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCke6ezwKbpLd92crm8zGcbQAB5iXJYXs",
  authDomain: "reward-app-rtd-production.firebaseapp.com",
  projectId: "reward-app-rtd-production",
  storageBucket: "reward-app-rtd-production.appspot.com",
  messagingSenderId: "937719923962",
  appId: "1:937719923962:web:85e9fb5879034f5fba7543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
// const storageRef = firebase.storage().ref();