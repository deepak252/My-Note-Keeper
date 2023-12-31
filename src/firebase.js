import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {  
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "my--note--book.firebaseapp.com",
  projectId: "my--note--book",
  storageBucket: "my--note--book.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);