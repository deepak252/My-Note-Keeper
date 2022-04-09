import React from 'react'
import "./EditNoteModal.scss";
import {FaTimes} from "react-icons/fa";
import {useState} from "react";
import FirestoreService from '../../services/firestoreService';

export const EditNoteModal = ({setModalVisibility, note}) => {

    const [updatedNote,setNote] = useState(note);
    console.log(updatedNote);
    // Updating Note
    const updateNote = async () =>{
        await FirestoreService.updateNote(updatedNote);
        setModalVisibility(false);
        
    }
    const inputHandler =(event)=>{
        const {value,name} = event.target;
        setNote((prevValue)=>{
            return {
                ...prevValue,
                title: name==="noteTitle"?value : prevValue.title,
                description: name==="noteDescription"?value : prevValue.description
            }
        });
    }
    return (
        <div className="Edit-Note-Modal-BG">
            <div id="Edit-Note-Modal">
                <div className="Title">
                    <h2>NOTE</h2>
                    <FaTimes onClick={()=>setModalVisibility(false)} className="Close-Icon"/>
                </div>
                <div className="Create-Note-Form">
                    <input type="text" value={updatedNote.title}  onChange={inputHandler} name="noteTitle" placeholder="Title" />
                    <textarea type="text" value={updatedNote.description}  onChange={inputHandler} name="noteDescription" placeholder="Description" />
                    <button onClick={updateNote} >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}
