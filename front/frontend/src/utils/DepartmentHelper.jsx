import { useNavigate } from "react-router-dom";
import axios from "axios";

export const coloumns = [
  {
    name: " S No ",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  

  {
  name: "Action",
  cell: (row) => row.action,
}
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete..?");
    if (confirm) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
          `http://localhost:6007/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        console.error("Fetch department error:", error);
        alert(error.response?.data?.error || "Failed to fetch department");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>{" "}
    </div>
  );
};
