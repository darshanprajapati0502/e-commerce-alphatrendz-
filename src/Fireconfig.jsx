// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaZpqEBw7Amovkuit6opyK5tVEoezsKpI",
  authDomain: "alphatrendz-619f2.firebaseapp.com",
  projectId: "alphatrendz-619f2",
  storageBucket: "alphatrendz-619f2.appspot.com",
  messagingSenderId: "38860690994",
  appId: "1:38860690994:web:20ca3c4e39bede8f954e2b",
  measurementId: "G-W1C825F01X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
 export const storage = getStorage(app);