import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoutes from "./ProtectedRoutes";
import Feed from "../pages/Feed";
import Dashboard from "../pages/Dashboard";
import Stats from "../pages/Stats";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;