// import React, { useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component';
// // import { coloumns, LeaveButtons } from '../../utils/LeaveHelper';
// import axios from "axios";

// const Table = () => {

//     const [leaves,setLeaves]=useState(null);
//     const [filteredLeaves,setFilteredLeaves]=useState(null)



//     const fecthLeaves=async ()=>{
//            try {
//         setEmpLoading(true);

//         const response = await axios.get(
//           "http://localhost:6007/api/leave",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           let sno = 1;

//           const data = response.data.leaves.map((leave) => ({
//             _id: leave._id,
//             sno: sno++,
//             employeeId:leave.employeeId.employeeId,
//                name: leave.userId?.name || "N/A",
//                leaveType:leave.leaveType,
//             department: leave.employeeId.department.dep_name || "N/A",
         
//             days: new Date (leave.endDate).getDate()-new Date(leave.startDate).getDate(),
//             status:leave.status,

//             action:  <LeaveButtons Id={leave._id} /> ,
           
//           }));

//           setLeaves(data);
//           setFilteredLeaves(data)
//         }
//       } catch (error) {
//         console.error(
//           "Fetch  Levaes error:",
//           error.response?.data || error.message
//         );

//         alert(
//           error.response?.data?.error ||
//             "Failed to fetch levaes"
//         );
//       }
//     }

//     useEffect(()=>{
//       fecthLeaves()

//     },[])

//     const filterByInput=(e)=>{
//       const data=leaves.filter(leave =>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
//       setFilteredLeaves(data)

//     }

//       const filterByButton=(status)=>{
//       const data=leaves.filter(leave =>leave.status.toLowerCase().includes(status.toLowerCase()));
//       setFilteredLeaves(data)

//     }


//   return (
//     <>
//     {filteredLeaves? (

//     <div className='p-6'>
//           <div className="text-center">
//         <h3 className="text-2xl font-bold">
//           Manage Leaves
//         </h3>
//       </div>

//       <div className="flex justify-between items-center my-4">
//         <input
//           type="text"
//           placeholder="Search By Emp Id"
//           className="px-4 py-1 border rounded"
//           onChange={filterByInput}
//         />
//         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={()=>filterByButton("Pending")}>Pending </button>
//         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={()=>filterByButton("Approved")}>Approved</button>
//         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={()=>filterByButton("Rejected")}>Rejected</button>

    
//       </div>
//       <div className='mt-3'>
//       <DataTable columns={coloumns} data={filteredLeaves} pagination/>
//      </div>
//     </div>
//     )  : <div>Loadingg</div>}
//     </>
//   )
// }

// export default Table



import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Table = () => {

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:6007/api/leave",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API DATA:", response.data);

      if (response.data.success) {

        const data = response.data.leaves.map((leave, index) => {

          const employee = leave.employeeId;

          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);

          const days = Math.ceil(
            (end - start) / (1000 * 60 * 60 * 24)
          ) + 1;

          return {
            _id: leave._id,
            sno: index + 1,
            employeeId: employee?.employeeId || "N/A",
            name: employee?.userId?.name || leave.userId?.name || "N/A",
            leaveType: leave.leaveType || "N/A",
            department: employee?.department?.dep_name || "N/A",
            days: days > 0 ? days : 0,
            status: leave.status || "Pending"
          };
        });

        setLeaves(data);
        setFilteredLeaves(data);
      }

    } catch (error) {

      console.error(
        "Fetch Leaves Error:",
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {

    const value = e.target.value.toLowerCase();

    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.employeeId.toLowerCase().includes(value)
      )
    );
  };

  const filterByButton = (status) => {

    setFilteredLeaves(
      leaves.filter(
        (leave) => leave.status.toLowerCase() === status.toLowerCase()
      )
    );
  };

  const columns = [
    {
      name: "S No",
      selector: row => row.sno,
      width: "80px"
    },
    {
      name: "Employee ID",
      selector: row => row.employeeId,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Leave Type",
      selector: row => row.leaveType
    },
    {
      name: "Department",
      selector: row => row.department
    },
    {
      name: "Days",
      selector: row => row.days
    },
    {
      name: "Status",
      selector: row => row.status
    },
    {
      name: "Action",
      cell: row => (
        <button
          className="px-4 py-1 bg-teal-500 text-white rounded"
          onClick={() =>
            navigate(`/admin-dashboard/leaves/${row._id}`)
          }
        >
          View
        </button>
      )
    }
  ];

  return (
    <div className="p-6">

      <h3 className="text-2xl font-bold text-center">
        Manage Leaves
      </h3>

      <div className="flex justify-between items-center my-4">

        <input
          type="text"
          placeholder="Search By Emp Id"
          className="px-4 py-1 border rounded"
          onChange={filterByInput}
        />

        <button
          className="px-2 py-1 bg-teal-600 text-white rounded"
          onClick={() => filterByButton("Pending")}
        >
          Pending
        </button>

        <button
          className="px-2 py-1 bg-teal-600 text-white rounded"
          onClick={() => filterByButton("Approved")}
        >
          Approved
        </button>

        <button
          className="px-2 py-1 bg-teal-600 text-white rounded"
          onClick={() => filterByButton("Rejected")}
        >
          Rejected
        </button>

        <button
          className="px-2 py-1 bg-gray-600 text-white rounded"
          onClick={() => setFilteredLeaves(leaves)}
        >
          All
        </button>

      </div>

      {loading ? (
        <p>Loading leaves...</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          highlightOnHover
        />
      )}

    </div>
  );
};

export default Table;










