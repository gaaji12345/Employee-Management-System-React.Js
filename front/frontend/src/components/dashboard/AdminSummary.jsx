import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";

const AdminSummary = () => {
   
  const [summary,setSummary]=useState(null)

  useEffect(()=>{
    const fetchSummary=async () => {
      try{
        const summary=await axios.get('http://localhost:6007/api/dashboard/summary',{
           headers : {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
        })
        setSummary(summary.data)

      }catch(error){
        if(error.response){
          alert(error.response.data.error)
        }

      }
    }
    fetchSummary()
  },[])

  if(!summary){
    return <div>Loading...</div>
  }






  return (
    <div>
      <h3 className='text-2xl font-bold'>DashBaord Overview </h3> 
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUser/>} text="Total Employee" number={summary.totalEmployees} color="bg-teal-600"></SummaryCard >
         <SummaryCard icon={<FaBuilding/>} text="Total Departments" number={summary.totalDepartments}></SummaryCard>
         <SummaryCard icon={<FaMoneyBillWave/>} text="Monthly Salary" number={summary.totalSalary}></SummaryCard>

      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 '>
           {/* <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600"></SummaryCard>
             <SummaryCard icon={<FaCheckCircle/>} text="leave approved" number={summary.leaveSummary.approved} color="bg-teal-600"></SummaryCard>
         <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending " number={summary.leaveSummary.pending} color="bg-teal-600"></SummaryCard>
         <SummaryCard icon={<FaTimesCircle/>} text="Leave Reject" number={summary.leaveSummary.rejected} color="bg-teal-600"></SummaryCard> */}

         <SummaryCard
  icon={<FaFileAlt />}
  text="Leave Applied"
  number={summary.leaveSummary.appliedFor}
  color="bg-teal-600"
/>

<SummaryCard
  icon={<FaCheckCircle />}
  text="Leave Approved"
  number={summary.leaveSummary.approved}
  color="bg-teal-600"
/>

<SummaryCard
  icon={<FaHourglassHalf />}
  text="Leave Pending"
  number={summary.leaveSummary.pending}
  color="bg-teal-600"
/>

<SummaryCard
  icon={<FaTimesCircle />}
  text="Leave Rejected"
  number={summary.leaveSummary.rejected}
  color="bg-teal-600"
/>



        </div>

      </div>
       
    </div>
  )
}

export default AdminSummary