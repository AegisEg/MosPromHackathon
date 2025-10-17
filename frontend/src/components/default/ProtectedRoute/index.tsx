import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthStatus, selectToken } from "../../../redux/user/selectors";
import { getTokenFromStorage } from "../../../redux/user/actions";
import { useTypedDispatch } from "../../../redux/store";
import { LoadStatus } from "../../../utils/types";
import Loader from "../Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useTypedDispatch();
  
  const token = useSelector(selectToken);
  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    if (!token && status === LoadStatus.NOT_LOADING) {
      dispatch(getTokenFromStorage());
    }
  }, [dispatch, token, status]);

  console.log('token', token);
  console.log('status', status);

  if (status === LoadStatus.IN_PROGRESS) return <Loader />;

  if ((status === LoadStatus.SUCCESS || status === LoadStatus.ERROR) && !token) return <Navigate to="/authorization" replace />;

  if (token) return <>{children}</>;

  return <>{children}</>;
};

export default ProtectedRoute;