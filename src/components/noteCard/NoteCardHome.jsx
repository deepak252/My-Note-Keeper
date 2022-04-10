import React from 'react';
import "./NoteCardHome.scss";
import { FaEllipsisV, FaBookmark } from 'react-icons/fa';
import FirestoreService from '../../services/firestoreService';
import {  useState} from 'react';
import { EditNoteModal } from '../editNoteModal/EditNoteModal';
import {useSelector} from "react-redux";

export const NoteCardHome = ({note}) => {
    const [editNoteModalVisibility, setEditNoteModalVisibility] = useState(false);
    const userId = useSelector(state=>state.userId);

    
    return (
        <>
        {
            editNoteModalVisibility&&
            <EditNoteModal setModalVisibility={setEditNoteModalVisibility} note = {note}/>
        }
        <div id="Note-Card-Home" onClick={()=>{}}>
            <h3 id="Note-Title">{note?.title} </h3>
            <div className="Dropdown">
                < FaEllipsisV id="Dropdown-Icon"  size="18"/>
                <div id="Dropdown-Options">
                    <button onClick={()=>{setEditNoteModalVisibility(true)}} className="Dropdown-Btn">Edit</button>
                    <button onClick={()=>FirestoreService.bookmarkNote({noteId: note?.id, isBookmarked : !note.bookmarked, userId : userId})} className="Dropdown-Btn">
                        {note.bookmarked ? "Remove From Bookmark" : "Bookmark"}
                    </button>
                    <button onClick={()=>FirestoreService.trashNote({noteId: note?.id, isDeleted : true, userId : userId})} className="Dropdown-Btn">Delete</button>
                </div>
            </div>
            <p id="Note-Description">
                {note?.description}
            </p>
            <p id="Note-Created-Time"> {note?.timeStamp.toDate().toDateString()}, {note?.timeStamp.toDate().toLocaleTimeString()} {note?.bookmarked?< FaBookmark id="Bookmark-Icon" />:<span />}</p>
        </div>
        </>
    )
}
