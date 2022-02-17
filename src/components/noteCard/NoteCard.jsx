import React from 'react';
import "./NoteCard.scss";
import { FaEllipsisV, FaBookmark } from 'react-icons/fa';
import FirestoreService from '../../services/FirestoreService';

export const NoteCard = ({note}) => {
    return (
        <div id="Note-Card" onClick={()=>{}}>
            <h3 id="Note-Title">{note?.title} </h3>
            <div className="Dropdown">
                < FaEllipsisV id="Dropdown-Icon"  size="18"/>
                <div id="Dropdown-Options">
                    <button  className="Dropdown-Btn">Edit</button>
                    <button onClick={()=>FirestoreService.markNoteAsBookmark({noteId: note?.id, isBookmarked : true})} className="Dropdown-Btn">Bookmark</button>
                    <button onClick={()=>FirestoreService.markNoteAsDelete({noteId: note?.id, isDeleted : true})} className="Dropdown-Btn">Delete</button>
                </div>
            </div>
            <p id="Note-Description">
                {note?.description}
            </p>
            <p id="Note-Created-Time"> {note?.timeStamp.toDate().toDateString()}, {note?.timeStamp.toDate().toLocaleTimeString()} {note?.bookmarked?< FaBookmark id="Bookmark-Icon" />:<span />}</p>
        </div>
    )
}
