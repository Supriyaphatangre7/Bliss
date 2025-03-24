import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";



const ProtectedRoutes = () => {
  const { isLoggedIn } =useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;