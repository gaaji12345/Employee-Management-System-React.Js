import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

const View = () => {

    const {id} = useParams()
    const [employee,setEmployee]=useState(null)

     useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:6007/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        console.error("Fetch department error:", error);
        alert(
          error.response?.data?.error ||
          "Failed to fetch department"
        );
      } 
    };

    fetchEmployee();
  }, [id]);

  return (
    <> {employee  ? (
    <div className='max-w -3xl mx-auto mt-10  bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            {/* <img  src={`http://localhost:6007/${employee.userId.prfileImage}`} 
            className='rounded-full border w-72' alt=""/> */}
            <img
  src={`http://localhost:6007/uploads/${employee.userId.profileImage}`}
  alt="Employee"
  className="rounded-full border w-72 h-72 object-cover"
/>
        </div>

        <div>
            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Name :</p>
              <p className='font-medium'>{employee.userId.name}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>EmployeeID :</p>
              <p className='font-medium'>{employee.employeeId}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>DOB :</p>
              <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Gender :</p>
              <p className='font-medium'>{employee.gender}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Department</p>
              <p className='font-medium'>{employee.department.dep_name}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Marital Staus:</p>
              <p className='font-medium'>{employee.maritalStatus}</p>
            </div>
             </div>
        </div>
    </div>
    ): <div> ... LOADING</div> } </>
  )
}

export default View