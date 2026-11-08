


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router-dom";

const ListL = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:6007/api/leave/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLeaves(
          Array.isArray(response.data.leaves)
            ? response.data.leaves
            : []
        );
      } catch (err) {
        console.error(
          "Fetch leaves error:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.error || "Failed to fetch leave requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [user?._id]);

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Leave Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={leave._id} className="bg-white border-b">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">
                    {leave.startDate
                      ? new Date(leave.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-3">
                    {leave.endDate
                      ? new Date(leave.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">
                    {leave.appliedAt
                      ? new Date(leave.appliedAt).toLocaleDateString()
                      : leave.createdAt
                        ? new Date(leave.createdAt).toLocaleDateString()
                        : "N/A"}
                  </td>
                  <td className="px-6 py-3">{leave.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListL;
