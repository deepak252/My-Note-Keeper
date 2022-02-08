import React from 'react';
import {db} from "../firebase.js"
import { collection, addDoc,getDocs } from "firebase/firestore"; 



export const Home = () => {

    const addNote = async () =>{
        try {
            const docRef = await addDoc(collection(db, "users"), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
          
    }
    return (
        <div>
            <button onClick={addNote}>
                Add Note
            </button>
        </div>
    )
}
