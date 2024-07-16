import React, { useState } from 'react';

import { Outlet, NavLink } from 'react-router-dom';
import StaffHeader from '../StaffLayout/StaffHeader';
import GuestFooter from '../GuestLayout/GuestFooter';


const StaffLeftNavBar = () => {
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
                <NavLink to="/staff/view">View Applications</NavLink>
                <NavLink to="/staff/services">Services</NavLink>
                <NavLink to="/staff/trackingapplication">Tracking Application</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <StaffHeader />
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

export default StaffLeftNavBar;
