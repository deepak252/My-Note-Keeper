import React from 'react'
import "./Sidebar.scss";
import { SidebarTile } from './SidebarTile';
import { useSelector } from 'react-redux';

export const Sidebar = () => {
    const screenWidth = useSelector(state=>state.screenWidth);

    return (
        <>
            {
                screenWidth>=600 &&
                <div id="Sidebar">
                    <h1>My Note Book</h1>
                    <SidebarTile title= "Home"/>
                    <SidebarTile title= "Bookmarked"/>
                    <SidebarTile title= "Trash"/>
                    <SidebarTile title= "Favourites"/>
                    <SidebarTile title= "Favourites"/>
                    <SidebarTile title= "Favourites"/>
                </div>

            }
        </>
    )
}
