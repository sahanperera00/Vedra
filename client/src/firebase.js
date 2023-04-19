// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-xUj9uE6moia96U04xBltPAToBXqLnrc",
  authDomain: "vedra-8d493.firebaseapp.com",
  projectId: "vedra-8d493",
  storageBucket: "vedra-8d493.appspot.com",
  messagingSenderId: "791238865100",
  appId: "1:791238865100:web:ec7f68527e6c69c457d269",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
