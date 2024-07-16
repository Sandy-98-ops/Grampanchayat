import React, { useState } from 'react';

import { Outlet, NavLink } from 'react-router-dom';
import StaffHeader from '../StaffLayout/StaffHeader';
import GuestFooter from '../GuestLayout/GuestFooter';
import TalathiHeader from './TalathiHeader';


const TalathiLeftNavBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? '☰' : '✖'}
            </button>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <NavLink to="/talathi/view">View Applications</NavLink>
                <NavLink to="/talathi/services">Services</NavLink>
                <NavLink to="/talathi/trackingapplication">Tracking Application</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <TalathiHeader />
                    </div>
                    <div className="Outlet">
                        <Outlet />
                    </div>
                    <div className="GuestFooter">
                        <GuestFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TalathiLeftNavBar;
