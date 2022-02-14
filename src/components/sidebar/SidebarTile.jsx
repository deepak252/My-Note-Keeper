import React from 'react'
import "./SidebarTile.scss";

export const SidebarTile = (props) => {
    return (
        <button id="Sidebar-Tile">
            {props.title}
        </button>
    )
}
