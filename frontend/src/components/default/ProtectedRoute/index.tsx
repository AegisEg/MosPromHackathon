import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthData } from "../../../redux/user/selectors";
import { LoadStatus } from "../../../utils/types";
import Loader from "../Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {token, status} = useSelector(selectAuthData);
  
  if (status === LoadStatus.IN_PROGRESS) return <Loader />;

  if (!token) {
    return <Navigate to="/authorization" replace />;
  }

  if (token) return <>{children}</>;

  return <>{children}</>;
};

export default ProtectedRoute;