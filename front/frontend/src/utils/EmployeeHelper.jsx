
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const coloumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId || "N/A",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Image",
    cell: (row) =>
      row.profileImage ? (
        <img
          src={`http://localhost:6007/uploads/${row.profileImage}`}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        "No Image"
      ),
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => <EmployeeButtons Id={row._id} />,
    width: "300px",
  },
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:6007/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.departments;
    }

    return [];
  } catch (error) {
    console.error(
      "Fetch departments error:",
      error.response?.data || error.message
    );

    return [];
  }
};

//employess for salary

// export const getEmployees = async (id) => {
//   let employees;
//   try {
//     const response = await axios.get(
//       `http://localhost:6007/api/employee/department${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     if (response.data.success) {
//       return response.data.employees;
//     }

 
//   } catch (error) {
//     console.error(
//       "Fetch Employee error:",
//       error.response?.data || error.message
//     );

//     return employees;
//   }
// };






export const getEmployees = async (departmentId) => {
  try {
    console.log("Selected department ID:", departmentId);

    const response = await axios.get(
      `http://localhost:6007/api/employee/department/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Employee API data:", response.data);

    if (response.data.success) {
      return response.data.employees || response.data.employee || [];
    }

    return [];
  } catch (error) {
    console.error(
      "Get employees failed:",
      error.response?.data || error.message
    );

    return [];
  }
};







export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}/edit`)}
       
      >
        Edit
      </button>

     

      <button
        className="px-3 py-1 bg-amber-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}/salary`)}
      >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}/leave`)}
      >
        Leave
      </button>
    </div>
  );
};
