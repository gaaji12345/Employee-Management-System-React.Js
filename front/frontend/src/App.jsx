import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmenList from "./components/department/DepartmenList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home page */}
        <Route
          path="/"
          element={<Navigate to="/admin-dashboard" replace />}
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin dashboard parent route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashBoard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Default admin dashboard page */}
          <Route index element={<AdminSummary />} />

          {/* Departments page */}
          <Route
            path="departments"
            element={<DepartmenList />}
          />

           <Route
            path="add-department"
            element={<AddDepartment />}
          />

           <Route
            path="department/:id"
            element={<EditDepartment />}
          />

        </Route>
         
         

        {/* Employee dashboard */}
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
