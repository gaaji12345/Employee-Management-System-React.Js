


import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddL = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    if (user?._id) {
      setLeave((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leave.userId) {
      alert("User information is not loaded. Please log in again.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:6007/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Leave request submitted successfully!");
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.error(
        "Add leave error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.error ||
        "Failed to submit leave request"
      );
    }
  };

  // Keep your existing JSX form below this point.
  // Use value={leave.leaveType}, value={leave.startDate},
  // value={leave.endDate}, and value={leave.reason}.

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Request For A Leave
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                min={leave.startDate || new Date().toISOString().split("T")[0]}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave"
              rows={4}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddL;

