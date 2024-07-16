import React, { useState } from 'react'
import CircleOfficerHeader from './CircleOfficerHeader';
import { Outlet, NavLink } from 'react-router-dom';
import GuestFooter from '../GuestLayout/GuestFooter';

const CircleOfficerLeftNavBar = () => {
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
                {/* <NavLink to="/circle/talathi">Add Talathi</NavLink> */}
                <NavLink to="/circle/staff">Add Staff</NavLink>
                {/* <NavLink to="/circle/viewTalathis">Talathi List</NavLink> */}
                <NavLink to="/circle/viewStaff">Staff List</NavLink>

                <NavLink to="/circle/view">View Applications</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <CircleOfficerHeader />
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

export default CircleOfficerLeftNavBar
