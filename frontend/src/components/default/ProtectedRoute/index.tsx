import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthData } from "../../../redux/user/selectors";
import { LoadStatus } from "../../../utils/types";
import Loader from "../Loader";
import { getUserDataAction } from "../../../redux/user/actions";
import { useTypedDispatch } from "../../../redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useTypedDispatch();

  const {token, status} = useSelector(selectAuthData);

  
  useEffect(() => {
     if(token && status === LoadStatus.SUCCESS) {
        dispatch(getUserDataAction());
     }
   }, [status, token, dispatch]);

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