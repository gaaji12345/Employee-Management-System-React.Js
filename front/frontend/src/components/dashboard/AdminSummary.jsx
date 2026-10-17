import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div>
      <h3 className='text-2xl font-bold'>DashBaord Overview </h3> 
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUser/>} text="Total Employee" number={13} color="bg-teal-600"></SummaryCard >
         <SummaryCard icon={<FaBuilding/>} text="Total Departments" number={5}></SummaryCard>
         <SummaryCard icon={<FaMoneyBillWave/>} text="Monthly Salary" number="$200"></SummaryCard>

      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 '>
           <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={5} color="bg-teal-600"></SummaryCard>
             <SummaryCard icon={<FaCheckCircle/>} text="leave approved" number={2} color="bg-teal-600"></SummaryCard>
         <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending " number={4} color="bg-teal-600"></SummaryCard>
         <SummaryCard icon={<FaTimesCircle/>} text="Leave Reject" number={1} color="bg-teal-600"></SummaryCard>



        </div>

      </div>
       
    </div>
  )
}

export default AdminSummary