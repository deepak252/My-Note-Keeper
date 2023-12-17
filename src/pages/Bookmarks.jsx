import React from 'react';
import "./Bookmarks.scss"
import FirestoreService from '../services/firestoreService';
import { useEffect, useState} from 'react';
import { CreateNoteModal } from '../components/createNoteModal/CreateNoteModal';
import Note from '../models/Note';
import { FaPlus } from 'react-icons/fa';
import { NoteCardBookmark } from '../components/noteCard/NoteCardBookmark';
import {useSelector} from "react-redux";


const Bookmark = () => {

    const [notes, setNotes] = useState([]);
    const [createNoteModalVisibility, setCreateNoteModalVisibility] = useState(false);
    const userId = useSelector(state=>state.userId);
    useEffect(()=>{
        const unsubscribe = FirestoreService.streamBookmarkedNotes((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                console.log(doc.data());
            })     
            let tmpNotes = querySnapshot.docs.map((doc)=>{
                return Note.fromJson(doc.data());
            }); 
            setNotes(tmpNotes);
        },
        (error)=>{
            console.log("streamNotes error : ", error);
        },userId  );

        return ()=>{
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    },[userId])
    
    return (
        <div id="Bookmarks">
            <h1 className="Heading">Bookmarked Notes</h1>
            {
                createNoteModalVisibility&&
                <CreateNoteModal setModalVisibility={setCreateNoteModalVisibility}/>
            }
            <div className="Notes-Container">
                {
                    notes.map((note)=>{
                        return <NoteCardBookmark note={note} key={note.id} />
                        
                    })
                }
            </div>
            <button id="Btn-Add-Note" onClick={()=>{setCreateNoteModalVisibility(true)}}>
                <FaPlus />
            </button>
        </div>
    )
}
export default Bookmark;