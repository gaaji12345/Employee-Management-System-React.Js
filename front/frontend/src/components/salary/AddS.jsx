import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddS = () => {

const [salary, setSalary] = useState({
  employeeId: "",
  basicSalary: "",
  allowances: "",
  deductions: "",
  payDate: "",
});

const [departments, setDepartments] = useState([]);
const [employees, setEmployees] = useState([]);



  const navigate = useNavigate();

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

  // const handleDepartment = async (e)=>{
  //   const emps = await getEmployees(e.target.value)
  //   setEmployees(emps)
    
  // }


// const handleDepartment = async (e) => {
//   const departmentId = e.target.value;

//   setEmployees([]);
//   setSalary((prev) => ({
//     ...prev,
//     employeeId: "",
//   }));

//   if (!departmentId) return;

//   const emps = await getEmployees(departmentId);

//   console.log("Selected department ID:", departmentId);
//   console.log("Employees:", emps);

//   setEmployees(Array.isArray(emps) ? emps : []);
// };


const handleDepartment = async (e) => {
  const departmentId = e.target.value;

  setEmployees([]);
  setSalary((prev) => ({
    ...prev,
    employeeId: "",
  }));

  if (!departmentId) return;

  const data = await getEmployees(departmentId);

  console.log("Employees returned:", data);

  setEmployees(Array.isArray(data) ? data : []);
};

// const handleDepartment = async (e) => {
//   const departmentId = e.target.value;

//   console.log("Selected department ID:", departmentId);

//   setEmployees([]);
//   setSalary((prev) => ({
//     ...prev,
//     employeeId: "",
//   }));

//   if (!departmentId) return;

//   const data = await getEmployees(departmentId);

//   console.log("Employees received by UI:", data);

//   setEmployees(Array.isArray(data) ? data : []);
// };


//   const handleDepartment = async (e) => {
//   const departmentId = e.target.value;

//   setEmployees([]);

//   if (!departmentId) return;

//   try {
//     const emps = await getEmployees(departmentId);

//     console.log("Selected department:", departmentId);
//     console.log("Employees returned:", emps);

//     setEmployees(Array.isArray(emps) ? emps : []);
//   } catch (error) {
//     console.error("Failed to fetch employees:", error);
//     setEmployees([]);
//   }
// };



 



  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  
  //   setSalary((prevData)=>({...prevData,[name]:value}));
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setSalary((prev) => ({
    ...prev,
    [name]: value,
  }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
 

      const response = await axios.post(
        `http://localhost:6007/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        alert("Employee updated successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error("Update employee error:", error.response?.data || error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update employee",
      );
    }
  
  
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/*dep*/}

              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>

                <select
                  name="department"
                  onChange={handleDepartment}
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

               {/* employee */}

              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>

                  


    <select
    name="employeeId"
    value={salary.employeeId || ""}
    onChange={handleChange}
    required
    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
  >
    <option value="">Select Employee ID</option>

    {employees.map((emp) => (
      <option key={emp._id} value={emp._id}>
        {emp.employeeId}
      </option>
    ))}
  </select>

              
              </div>

          

              {/* designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                 
                  placeholder="basic salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* salry */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                 
                  placeholder="salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

               {/* deduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

                {/* deduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                 Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>


              

            
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div> Loading...</div>
      )}
    </>
  );
};

export default AddS;
