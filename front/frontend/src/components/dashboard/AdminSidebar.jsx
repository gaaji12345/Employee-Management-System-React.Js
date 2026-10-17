import React from 'react'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
   <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
    <div className='bg-teal-600 h-12 flex items-center justify-center'>
      <h3 className='text-2xl text-center font-edu'>Emplyee MS</h3>
    </div>

      <div className='px-4'>
      <NavLink to="/admin-dashboard" className={({isActive})=>` ${isActive ? "bg-teal-500 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded` } end>
         <FaTachometerAlt/>
         <span>DashBoard</span>
      </NavLink>

       <NavLink to="/admin-dashboard"  className=" flex items-center space-x-4 block py-2.5 px-4 rounded">
         <FaUser/>
         <span>Employees</span>
      </NavLink>

       <NavLink to="/admin-dashboard/departments" className={({isActive})=>` ${isActive ? "bg-teal-500 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded` }>
         <FaBuilding/>
         <span>Department</span>
      </NavLink>

       <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
         <FaCalendarAlt/>
         <span>Leave</span>
      </NavLink>

       <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
         <FaMoneyBillWave/>
         <span>salary</span>
      </NavLink>

       <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
         <FaCogs/>
         <span>Setiing</span>
      </NavLink>

       </div>

     
   </div>
  )
}

export default AdminSidebar