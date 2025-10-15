import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useBuyer from "../Hooks/useBuyer";
import Loading from "../Loading/Loading";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <h1> HEY</h1>;
  }

  if (user && isBuyer) {
    return children;
  }
  return <Navigate to='/signin' state={{ from: location }} replace />;
};

export default BuyerRoute;
