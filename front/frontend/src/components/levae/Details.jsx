import React, { useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const Detail = () => {

    const {id} = useParams()
    const [leave,setLeave ]=useState(null)

    const navigate=useNavigate()


useEffect(() => {
  const fetchLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:6007/api/leave/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Leave Details:", response.data);

      if (response.data.success) {
        setLeave(response.data.leave);
      }

    } catch (error) {
      console.error(
        "Fetch Leave Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
        "Failed to fetch leave details"
      );
    }
  };

  fetchLeave();
}, [id]);




  //    useEffect(() => {
  //   const fetchLeave = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const response = await axios.get(
  //         `http://localhost:6007/api/levae/detail/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.data.success) {
  //         setLeave(response.data.leave)
  //       }
  //     } catch (error) {
  //       console.error("Fetch department error:", error);
  //       alert(
  //         error.response?.data?.error ||
  //         "Failed to fetch department"
  //       );
  //     } 
  //   };

  //   fetchLeave();
  // }, [id]);

  // const changeStatus = async(id,status)=>{
  //      try {
  //       const token = localStorage.getItem("token");

  //       const response = await axios.get(
  //         `http://localhost:6007/api/levae/${id}`,{status},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       if (response.data.success) {
  //           navigate('/admin-dashboard/leaves')
  //       }
  //     } catch (error) {
  //       console.error("Fetch department error:", error);
  //       alert(
  //         error.response?.data?.error ||
  //         "Failed to fetch department"
  //       );
  //     } 
  // }





const changeStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `http://localhost:6007/api/leave/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Updated Leave:", response.data);

    if (response.data.success) {
      alert(`Leave ${status} successfully`);
      navigate("/admin-dashboard/leaves");
    }

  } catch (error) {
    console.error("Update Error:", error.response?.data || error.message);

    alert(error.response?.data?.error || "Failed to update leave status");
  }
};


  return (
    <> {leave  ? (
    <div className='max-w -3xl mx-auto mt-10  bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            {/* <img  src={`http://localhost:6007/${employee.userId.prfileImage}`} 
            className='rounded-full border w-72' alt=""/> */}
            <img
  src={`http://localhost:6007/uploads/${leave.employeeId.userId.profileImage}`}
  alt="Employee"
  className="rounded-full border w-72 h-72 object-cover"
/>
        </div>

        <div>
            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Name :</p>
              <p className='font-medium'>{leave.employeeId.userId.name}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>EmployeeID :</p>
              <p className='font-medium'>{leave.employeeId.employeeId}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Leave Type</p>
              <p className='font-medium'>{leave.leaveType}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Reason</p>
              <p className='font-medium'>{leave.reason}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Department</p>
              <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>Start Date:</p>
              <p className='font-medium'>{new Date(leave.stratDate).toLocaleDateString()}</p>
            </div>

              <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>End Date:</p>
              <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
            </div>

              <div className="flex space-x-3 mb-5">
              <p className='text-lg font-bold'>
                {leave.status === "Pending" ? "Action" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                    <div className='flex space-x-2'>
                        <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400' onClick={()=> changeStatus(leave._id,"Approved")}>Approve</button>
                      <button className='px-2 py-0.5 bg-red-300 hover:bg-teal-400' onClick={()=> changeStatus(leave._id,"Rejected")}>Reject</button>


                    </div>

                ):
               <p className='font-medium'>{leave.status}</p>

            }
            </div>


             </div>
        </div>
    </div>
    ): <div> ... LOADING</div> } </>
  )
}

export default  Detail