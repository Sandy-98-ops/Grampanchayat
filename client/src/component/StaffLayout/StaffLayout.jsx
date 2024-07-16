import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestFooter from '../GuestLayout/GuestFooter'
import StaffHeader from './StaffHeader'
import StaffLeftNavBar from './StaffLeftNavBar'


const StaffLayout = () => {
  return (
    <div>
      <StaffLeftNavBar />
    </div>
  )
}

export default StaffLayout
