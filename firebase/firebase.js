import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDrR3uSN1PUHAcnxPayOf7d67tx3eTAij4",
  authDomain: "mobilez-market-1683900425195.firebaseapp.com",
  projectId: "mobilez-market-1683900425195",
  storageBucket: "mobilez-market-1683900425195.appspot.com",
  messagingSenderId: "687610333798",
  appId: "1:687610333798:web:eabd7f80e073c9e15bfba7",
  measurementId: "G-8PKDYJSZMF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;