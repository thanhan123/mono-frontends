// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAiXkqpUNpR-FYuOIPY2W9fO21p6kZoEY",
  authDomain: "it-jobs-world.firebaseapp.com",
  projectId: "it-jobs-world",
  storageBucket: "it-jobs-world.appspot.com",
  messagingSenderId: "420303364011",
  appId: "1:420303364011:web:307ec33680fdf49161fcee",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

console.log("***> call here");
export const registerToken = () => {
  console.log("***> call here 2");
  getToken(messaging, {
    vapidKey:
      "BGPzQtLSP-5QQ07d-A6bhGQHJJTq6mIVCA-P8hCmlm_iZIYZWtUcgz7XtIchfmlacSMBcH-NJ4XZJ74Q55iWQaw",
  })
    .then((token) => {
      console.log("***> getToken success", token);
    })
    .catch((error) => {
      console.log("***> getToken failed", error);
    });
};
