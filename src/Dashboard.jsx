import React from 'react'
import { Sidebar } from './components/sidebar/Sidebar';
import "./Dashboard.scss";
import { Home } from './pages/Home';

export const Dashboard = () => {
    return (
        <div id="Dashboard">
            <Sidebar />
            <Home />
        </div>  
    )
}
