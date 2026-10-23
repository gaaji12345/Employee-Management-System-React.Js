import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    getDepartments();
  }, []);

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
        setEmployee(response.data.employee);
      }
    } catch (error) {
      console.error("Fetch employee error:", error);
      alert(
        error.response?.data?.error ||
        "Failed to fetch employee"
      );
    }
  };

  fetchEmployee(); // Correct function!
}, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    setEmployee((prev) => ({
      ...prev,
      userId: {
        ...prev.userId,
        name: value,
      },
    }));
  } else {
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formdataobj = new FormData();

//     Object.keys(formData).forEach((key) => {
//       formdataobj.append(key, formData[key]);
//     });

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please log in first!");
//         navigate("/login");
//         return;
//       }

//       const response = await axios.put(
//         `http://localhost:6007/api/employee/${id} `,
//         employee,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.success) {
//         alert("Department added successfully!");
//         navigate("/admin-dashboard/employees");
//       }
//     } catch (error) {
//       console.error("Add department error:", error.response?.data || error);

//       alert(
//         error.response?.data?.error ||
//           error.response?.data?.message ||
//           "Failed to add department",
//       );
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const updatedData = {
      name: employee.userId.name,
      maritalStatus: employee.maritalStatus,
      designation: employee.designation,
      salary: employee.salary,
      department:
        employee.department?._id || employee.department,
    };

    const response = await axios.put(
      `http://localhost:6007/api/employee/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Employee updated successfully!");
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    console.error(
      "Update employee error:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update employee"
    );
  }
};

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.userId.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Marital Status*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  marital Staus
                </label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  placeholder="Marital Status"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                </select>
              </div>

              {/* designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* salry */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/*dep*/}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>

               
                <select
  name="department"
  value={employee.department?._id || employee.department || ""}
  onChange={handleChange}
  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
  required
>
  <option value="">Select department</option>

  {departments.map((dep) => (
    <option key={dep._id} value={dep._id}>
      {dep.dep_name}
    </option>
  ))}
</select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div> Loading...</div>
      )}
    </>
  );
};

export default Edit;
