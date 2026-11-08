// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const ViewS = () => {

//   const [salaries, setSalaries] = useState();
//   const [fileredSalaries, setFilreredSalaries] = useState(null);
//   const { id } = useParams();
//   let sno = 1;

//   const fetchSalaries = async () => {
//     try {
//       const response = await axios.get(`http://localhost:6007/api/salary/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(response.data);
//       if (response.data.success) {
//         setSalaries(response.data.salary);
//         setFilreredSalaries(response.data.salary);
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.response) {
//         alert(error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchSalaries();
//   }, []);

//   const filterSalaries = (q) => {
//     const filteredRecords = salaries.filter((leave) =>
//       leave.employeeId.toLocalelowerCase().includes(q.toLocalelowerCase()),
//     );
//     setFilreredSalaries(filteredRecords);
//   };

//   return (
 

// <>
//   {fileredSalaries === null ? (
//     <div>Loading...</div>
//   ) : (
//     <div className="overflow-x-auto p-5">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold">Salary History</h2>
//       </div>

//       <div className="flex justify-end my-3">
//         <input
//           type="text"
//           placeholder="Search By EmpId"
//           className="border px-2 rounded-md py-1 border-gray-300"
//           onChange={(e) => {
//             const searchValue = e.target.value.toLowerCase();

//             const filtered = salaries.filter((salary) =>
//               salary.employeeId?.employeeId
//                 ?.toLowerCase()
//                 .includes(searchValue)
//             );

//             setFilteredSalaries(filtered);
//           }}
//         />
//       </div>

//       {fileredSalaries.length > 0 ? (
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//             <tr>
//               <th className="px-6 py-3">SNO</th>
//               <th className="px-6 py-3">Emp ID</th>
//               <th className="px-6 py-3">Salary</th>
//               <th className="px-6 py-3">Allowance</th>
//               <th className="px-6 py-3">Deduction</th>
//               <th className="px-6 py-3">Total</th>
//               <th className="px-6 py-3">Pay Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {fileredSalaries.map((salary, index) => (
//               <tr
//                 key={salary._id}
//                 className="bg-white border-b"
//               >
//                 <td className="px-6 py-3">{index + 1}</td>
//                 <td className="px-6 py-3">
//                   {salary.employeeId?.employeeId}
//                 </td>
//                 <td className="px-6 py-3">{salary.basicSalary}</td>
//                 <td className="px-6 py-3">{salary.allowances}</td>
//                 <td className="px-6 py-3">{salary.deductions}</td>
//                 <td className="px-6 py-3">{salary.netSalary}</td>
//                 <td className="px-6 py-3">
//                   {salary.payDate
//                     ? new Date(salary.payDate).toLocaleDateString()
//                     : "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center py-4">No Records..</div>
//       )}
//     </div>
//   )}
// </>

//   );
// };

// export default ViewS;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewS = () => {
  const { id } = useParams();

  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:6007/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Salary API response:", response.data);

        if (response.data.success) {
          const records = response.data.salary || [];
          setSalaries(records);
          setFilteredSalaries(records);
        }
      } catch (error) {
        console.error(
          "Fetch salary error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSalaries();
    }
  }, [id]);

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = salaries.filter((salary) =>
      salary.employeeId?.employeeId
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredSalaries(filtered);
  };

  if (loading) {
    return <div className="p-5">Loading salary records...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By EmpId"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-2 rounded-md py-1 border-gray-300"
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Allowance</th>
              <th className="px-6 py-3">Deduction</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredSalaries.map((salary, index) => (
              <tr key={salary._id} className="bg-white border-b">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">
                  {salary.employeeId?.employeeId || "N/A"}
                </td>
                <td className="px-6 py-3">{salary.basicSalary}</td>
                <td className="px-6 py-3">{salary.allowances}</td>
                <td className="px-6 py-3">{salary.deductions}</td>
                <td className="px-6 py-3">{salary.netSalary}</td>
                <td className="px-6 py-3">
                  {salary.payDate
                    ? new Date(salary.payDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No salary records found.</div>
      )}
    </div>
  );
};

export default ViewS;
