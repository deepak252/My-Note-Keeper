import React from 'react';
import "./NoteCard.scss";
import { FaEllipsisV, FaBookmark, FaRegBookmark } from 'react-icons/fa';

export const NoteCard = (props) => {
    return (
        <div id="Note-Card" onClick={()=>{}}>
            <h3 id="Note-Title">{props.note?.title} {props.note?.title}  {props.note?.title} {props.note?.title} </h3>
            <div className="Dropdown">
                < FaEllipsisV id="Dropdown-Icon"  size="18"/>
                <div id="Dropdown-Options">
                    <p className="Dropdown-Item">Edit</p>
                    <p className="Dropdown-Item">Bookmark</p>
                    <p className="Dropdown-Item">Delete</p>
                </div>
            </div>
            <p id="Note-Description">
                {props.note?.description}
            </p>
            <p id="Note-Created-Time">{!props.note?.bookmarked?< FaBookmark id="Bookmark-Icon" color="rgb(162, 162, 0)" size="16"/>:<div></div>} {props.note?.timeStamp.toDate().toDateString()}, {props.note?.timeStamp.toDate().toLocaleTimeString()}</p>
        </div>
    )
}
