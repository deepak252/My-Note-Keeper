import React from 'react';
import "./NoteCardTrash.scss";
import { FaEllipsisV, FaBookmark } from 'react-icons/fa';
import FirestoreService from '../../services/firestoreService';
import {useSelector} from "react-redux";

export const NoteCardTrash = ({note}) => {
    const userId = useSelector(state=>state.userId);

    return (
        <div id="Note-Card-Trash" onClick={()=>{}}>
            <h3 id="Note-Title">{note?.title} </h3>
            <div className="Dropdown">
                < FaEllipsisV id="Dropdown-Icon"  size="18"/>
                <div id="Dropdown-Options">
                    <button onClick={()=>FirestoreService.trashNote({noteId: note?.id, isDeleted : false, userId : userId})} className="Dropdown-Btn">Restore</button>
                    <button onClick={()=>FirestoreService.deleteNote({noteId: note?.id, userId : userId})} className="Dropdown-Btn">Delete Permanently</button>
                </div>
            </div>
            <p id="Note-Description">
                {note?.description}
            </p>
            <p id="Note-Created-Time"> {note?.timeStamp.toDate().toDateString()}, {note?.timeStamp.toDate().toLocaleTimeString()} {note?.bookmarked?< FaBookmark id="Bookmark-Icon" />:<span />}</p>
        </div>
    )
}
