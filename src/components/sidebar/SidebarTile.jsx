import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebarAction } from '../../state/actionCreators/toggleSidebarAction';
import "./SidebarTile.scss";

export const SidebarTile = (props) => {
    const dispatch = useDispatch();
    return (
        <button id="Sidebar-Tile" style={{backgroundColor: (props.isSelected? "rgba(0, 0, 0, 0.6)" : "") }} onClick={()=>{dispatch(toggleSidebarAction(false))}}>
            {props.title}
        </button>
    )
}
