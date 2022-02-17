import React from 'react'
import "./Sidebar.scss";
import { SidebarTile } from './SidebarTile';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
export const Sidebar = () => {
    const screenWidth = useSelector(state=>state.screenWidth);
    const [expandSidebar, setExpandSidebar] =useState(false);
    
    const toggleSidebarHandler =()=>{
        setExpandSidebar(!expandSidebar);
        !expandSidebar 
        ? document.body.style.overflow = "hidden"
        : document.body.style.overflow = "auto";
    }

    return (
        <>
            <div onClick={()=>{
                console.log("hello");
            }} className={"Nav-Sidebar "+ (expandSidebar && screenWidth<769 ? "Change-BG" : "")}>
                <div className={"Nav " + (expandSidebar || screenWidth>=769  ? "Hide-Nav" : "Show-Nav")} >
                    <button className="Btn-Menu" onClick={toggleSidebarHandler}>
                        <FaBars />
                    </button>
                    <h1>  My Note Book </h1>
                </div>
                <div className={"Sidebar " + (expandSidebar || screenWidth>=769  ? " Show-Sidebar " : " Hide-Sidebar ")}>
                    <h1>My Note Book</h1>
                    <div className="Sidebar-Options">
                        <SidebarTile title= "Home"/>
                        <SidebarTile title= "Bookmarks"/>
                        <SidebarTile title= "Trash"/>
                        <SidebarTile title= "Profile"/>
                    </div>
                    <p id="Copyright">@Copyright {new Date().getFullYear()}</p>
                </div>

                {
                    expandSidebar && screenWidth<769&&
                        <button onClick={toggleSidebarHandler} id="Btn-Close-Sidebar">
                            <FaTimes />
                        </button>
                }
            </div>
        </>
    )
}
