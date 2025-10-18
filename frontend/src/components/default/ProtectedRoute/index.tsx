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
  
  // Показываем лоадер пока идет проверка токена (начальная или загрузка)
  if (status === LoadStatus.IN_PROGRESS || status === LoadStatus.NOT_LOADING) {
    return <Loader />;
  }

  // После проверки (SUCCESS или ERROR) - если токена нет, редиректим на авторизацию
  if (!token) {
    return <Navigate to="/authorization" replace />;
  }

  // Если токен есть - показываем защищенный контент
  return <>{children}</>;
};

export default ProtectedRoute;