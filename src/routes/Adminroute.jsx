import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Userole from "../hooks/Userole";

const Adminroute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleloading } = Userole();
  const location = useLocation();

  if (loading || roleloading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return <div>🚫 Forbidden: Admin only</div>;
  }

  return children;
};

export default Adminroute;
