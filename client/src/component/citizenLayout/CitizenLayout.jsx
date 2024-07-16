import React from 'react'
import IncomeStep1 from './IncomeStep1'
import IncomeStep2 from './IncomeStep2'
import { Outlet } from 'react-router-dom'
import CitizenLeftNavBar from './CitizenLeftNavBar'

const CitizenLayout = () => {
  return (
    <div>
      <CitizenLeftNavBar />
    </div>
  )
}

export default CitizenLayout
