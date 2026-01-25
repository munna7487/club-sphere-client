import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Userole from "../hooks/Userole";

const DashboardRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleloading } = Userole();
  const location = useLocation();

  if (loading || roleloading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin" && role !== "manager") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default DashboardRoute;
