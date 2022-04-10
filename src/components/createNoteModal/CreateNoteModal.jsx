import React from 'react'
import "./CreateNoteModal.scss";
import {FaTimes} from "react-icons/fa";
import {useState} from "react";
import FirestoreService from '../../services/firestoreService';
import {useSelector} from "react-redux";
export const CreateNoteModal = ({setModalVisibility}) => {
    const userId = useSelector(state=>state.userId);
    const [note,setNote] = useState({
        title: "",
        description: ""
    });
    
    const createNewNote = async () =>{
        FirestoreService.addNote(note, userId);
        setModalVisibility(false);
        
    }
    const inputHandler =(event)=>{
        const {value,name} = event.target;
        setNote((prevValue)=>{
            return {
                title: name==="noteTitle"?value : prevValue.title,
                description: name==="noteDescription"?value : prevValue.description
            }
        });
    }
    return (
        <div className="Create-Note-Modal-BG">
            <div id="Create-Note-Modal">
                <div className="Title">
                    <h2>NOTE</h2>
                    <FaTimes onClick={()=>setModalVisibility(false)} className="Close-Icon"/>
                </div>
                <div className="Create-Note-Form">
                    <input type="text" value={note.title}  onChange={inputHandler} name="noteTitle" placeholder="Title" />
                    <textarea type="text" value={note.description}  onChange={inputHandler} name="noteDescription" placeholder="Description" />
                    <button onClick={createNewNote} >
                        CREATE
                    </button>
                </div>
            </div>
        </div>
    )
}
