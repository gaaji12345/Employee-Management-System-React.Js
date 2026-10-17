
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const [depLoading, setDepLoading] = useState(true);

  // Fetch the existing department
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:6007/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment({
            dep_name: response.data.department.dep_name || "",
            description: response.data.department.description || "",
          });
        }
      } catch (error) {
        console.error("Fetch department error:", error);
        alert(
          error.response?.data?.error ||
          "Failed to fetch department"
        );
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update department
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:6007/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department updated successfully!");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error("Update department error:", error);
      alert(
        error.response?.data?.error ||
        "Failed to update department"
      );
    }
  };

  if (depLoading) {
    return <div>Loading department...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-full">
      <h3 className="text-2xl font-bold mb-6">
        Edit Department
      </h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>

          <input
            id="dep_name"
            type="text"
            name="dep_name"
            value={department.dep_name}
            onChange={handleChange}
            placeholder="Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
