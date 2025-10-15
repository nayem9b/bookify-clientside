import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <h1> HEY</h1>;
  }
  console.log(isAdmin);
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to='/signin' state={{ from: location }} replace />;
};

export default AdminRoute;
