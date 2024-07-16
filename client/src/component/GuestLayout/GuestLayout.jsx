import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestFooter from './GuestFooter'
import GuestHeader from './GuestHeader'
import NavBar from './NavBar'

const GuestLayout = () => {
    return (
        <div className='GuestLayout'>
            <div className='GuestHeader'>
                <GuestHeader />
                <NavBar />

                </div>
            <div className='Outlet'>
                <Outlet /></div>
            <div className='GuestFooter'>
                <GuestFooter /></div>
        </div>
    )
}

export default GuestLayout
