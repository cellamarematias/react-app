// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgEsEV44MOGytR0jGpPP6cGFHtA71PT7U",
  authDomain: "my-first-project-c4eb2.firebaseapp.com",
  projectId: "my-first-project-c4eb2",
  storageBucket: "my-first-project-c4eb2.appspot.com",
  messagingSenderId: "268652657299",
  appId: "1:268652657299:web:2ca92fbdadc6416bb96b66",
  measurementId: "G-YMH2EQN833"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;