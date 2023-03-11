import { getFirestore } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCphdX8Ry3CXkNIsZEIJlRX71W435AdDvg',
    authDomain: "chatgpt-clone-e310a.firebaseapp.com",
    projectId: "chatgpt-clone-e310a",
    storageBucket: "chatgpt-clone-e310a.appspot.com",
    messagingSenderId: "1032704152208",
    appId: "1:1032704152208:web:7883259cc0450038477e15"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }