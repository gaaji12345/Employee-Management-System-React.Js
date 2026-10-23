// import React, { useState } from 'react'
// import {Link} from 'react-router-dom'
// import { useEffect } from 'react'
// import { coloumns, EmployeeButtons } from '../../utils/EmployeeHelper'
// import DataTable from 'react-data-table-component'
// import axios from "axios";

// const List = () => {
   

//   const [employees,setEmployees]=useState([])
//     const [empLoading,setEmpLoading]=useState(false)

//      useEffect(()=>{
//     setEmpLoading(true)
//     const fetchEmployees =async () =>{
//       try{
//        const response = await axios.get('http://localhost:6007/api/employee',{
//         headers : {
//           "Authorization" : `Bearer ${localStorage.getItem('token')}`
//         }
//        })
//        if(response.data.success){
//         let sno =1;
//           const data = await response.data.employees.map((dep)=>(
           
//             {
//               _id:emp._id,
//               sno:sno++,
//               dep_name: emp.department.dep_name,
//               name:emp.userId.name,
//               dob:new Date( emp.dob).toDateString(),
//               profileImage:emp.userId.profileImage,
//               action:(<EmployeeButtons Id={emp._id}/>),
//             } ));

//           setEmployees(data)
//           // setFilteredDepartments(data)
//         }
//     } catch(error){
//       if(error.response &&  !error.response.data.success){
//         alert(error.response.data.error)
//       }


//     }finally{
//       setDepLoading(false) 
//     }
//   };
//   fetchDepartments();
//   },[]);



//   return (
//     <div className='p-6'>
    
//       <div className='text-center'>
//         <h3 className='text-2xl font-bold'>Manage Employee List</h3>
//       </div>
       
//        <div className='flex justify-between items-center'>
//         <input type='text' placeholder='Search By Dep Name' className='px-4 py-0.5 border' />
//         <Link to='/admin-dashboard/add-employee' className='px-4 py-1 bg-teal-500 rounded text-white' >Add New Employee</Link> 

//        </div>
//        <div>
//          <DataTable columns={coloumns} data={employees}/>
//        </div>
//     </div>
//   )
// }

// export default List


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coloumns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setEmpLoading(true);

        const response = await axios.get(
          "http://localhost:6007/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;

          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            employeeId: emp.employeeId,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: emp.dob
              ? new Date(emp.dob).toDateString()
              : "N/A",
profileImage:  emp.userId?.profileImage  || "",
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(data);
        }
      } catch (error) {
        console.error(
          "Fetch employees error:",
          error.response?.data || error.message
        );

        alert(
          error.response?.data?.error ||
            "Failed to fetch employees"
        );
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">
          Manage Employee List
        </h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-1 border rounded"
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-500 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <DataTable
        columns={coloumns}
        data={employees}
        progressPending={empLoading}
        pagination
        highlightOnHover
        persistTableHead
        noDataComponent="No employees found"
      />
    </div>
  );
};

export default List;
