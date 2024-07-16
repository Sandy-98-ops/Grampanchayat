import React, { useState } from 'react';

import AdminHeader from './AdminHeader';
import { Outlet, NavLink } from 'react-router-dom';
import GuestFooter from '../GuestLayout/GuestFooter';

const LeftNavBar = () => {
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
                <NavLink to="/admin/scheme">Add Scheme</NavLink>
                <NavLink to="/admin/viewSchemes">View Schemes</NavLink>
                <NavLink to="/admin/circleOfficer">Add Circle Officer</NavLink>
                <NavLink to="/admin/viewCircleOfficers">View Circle Officers</NavLink>
                <NavLink to="/admin/view">View Applications</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <AdminHeader />
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

export default LeftNavBar;
