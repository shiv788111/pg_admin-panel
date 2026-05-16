import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Rooms from "./pages/Rooms";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";
import Amenities from "./pages/Amenities";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Expenses from "./pages/Expenses";
import Pg from "./pages/Pg";
// import OccupancyReport from "./pages/reports/OccupancyReport";
import TenantReport from "./pages/reports/TenantReport";
import AgreementReport from "./pages/reports/AgreementReport";
import DaywiseReport from "./pages/reports/DaywiseReport";
import RefundReport from "./pages/reports/RefundReport";
import RoomOccupancyReport from "./pages/reports/RoomOccupancyReport";
import DueRentReport from "./pages/reports/DueRentReport";
import Branches from "./pages/branches/Branches";
import Managers from "./pages/managers/Managers";

import MealPlans from "./pages/meals/MealPlans";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page - public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes - require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="payments" element={<Payments />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="amenities" element={<Amenities />} />
          <Route path="pg" element={<Pg />} />
          <Route path="branches" element={<Branches />} />
          <Route path="managers" element={<Managers />} />

          <Route path="meal-plans" element={<MealPlans />} />
          {/* Reports Routes */}
          {/* <Route path="reports/occupancy" element={<OccupancyReport />} /> */}
          <Route path="reports/tenants" element={<TenantReport />} />
          <Route path="reports/agreements" element={<AgreementReport />} />
          <Route path="reports/daywise" element={<DaywiseReport />} />
          <Route path="reports/refund" element={<RefundReport />} />
          <Route
            path="reports/room-occupancy"
            element={<RoomOccupancyReport />}
          />
          <Route path="reports/due-rent" element={<DueRentReport />} />
        </Route>

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
