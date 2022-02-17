import React from 'react'
import "./Sidebar.scss";
import { SidebarTile } from './SidebarTile';
import { useSelector,useDispatch } from 'react-redux';
import { toggleSidebarAction } from '../../state/actionCreators/toggleSidebarAction';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const screenWidth = useSelector(state=>state.screenWidth);
    const expandSidebar = useSelector(state=>state.sidebarToggle);
    const location = useLocation(); // current url 

    const toggleSidebarHandler =()=>{
        dispatch(toggleSidebarAction(!expandSidebar));
        !expandSidebar 
        ? document.body.style.overflow = "hidden"
        : document.body.style.overflow = "auto";
    }

    useEffect(()=>{
        dispatch(toggleSidebarAction(false));
    },[])

    return (
        <>
            <div  className={"Nav-Sidebar "+ (expandSidebar && screenWidth<769 ? "Change-BG" : "")}>
                <div className={"Nav " + (expandSidebar || screenWidth>=769  ? "Hide-Nav" : "Show-Nav")} >
                    <button className="Btn-Menu" onClick={toggleSidebarHandler}>
                        <FaBars />
                    </button>
                    <h1>  My Note Book </h1>
                </div>
                <div className={"Sidebar " + (expandSidebar || screenWidth>=769  ? " Show-Sidebar " : " Hide-Sidebar ")}>
                    <h1>My Note Book</h1>
                    <div className="Sidebar-Options">
                        <Link to="/"><SidebarTile isSelected = {location.pathname==="/"} title= "Home"/></Link>
                        <Link to="/bookmarks"><SidebarTile isSelected = {location.pathname==="/bookmarks"} title= "Bookmarks"/></Link>
                        <Link to="/trash"><SidebarTile isSelected = {location.pathname==="/trash"} title= "Trash"/></Link>
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

export default Sidebar;