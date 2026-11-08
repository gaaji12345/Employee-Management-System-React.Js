 import React from 'react'
import Sidebar from '../components/EmployeeDashBoard/Sidebar'
import { Outlet } from "react-router-dom"
import Navbar from '../components/dashboard/Navbar'
 
 const EmployeeDashboard = () => {
   return (
      <div className="flex">
         <Sidebar />
   
         <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
           <Navbar />
           <Outlet />
         </div>
       </div>
   )
 }
 
 export default EmployeeDashboard