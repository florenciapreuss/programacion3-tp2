// Import the functions you need from the SDKs you need
import app from 'firebase/app';
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpaeAAsrOY__nJN-G_XChrDymL_dbLjks",
  authDomain: "tp2-programacion.firebaseapp.com",
  projectId: "tp2-programacion",
  storageBucket: "tp2-programacion.appspot.com",
  messagingSenderId: "873880042522",
  appId: "1:873880042522:web:a277906b570a9f1e8ba5a3"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();