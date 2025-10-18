import { useEffect, useCallback } from "react";
import Loader from "../Loader"
import { selectAuthData, selectUserData } from "../../../redux/user/selectors";
import { useSelector } from "react-redux";
import { LoadStatus } from "../../../utils/types";
import { getUserData } from "../../../api/user";
import { getUserDataAction } from "../../../redux/user/actions";
import { useTypedDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../enums/UserRole";
import { getRoleNumber } from "../../../utils/userDataMapper";
import './style.scss';

export const AuthorizationProxy = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const {token, status} = useSelector(selectAuthData);
    const {data: userData, status: userDataStatus} = useSelector(selectUserData);

    const redirectToUserCabinet = useCallback((role: UserRole) => {
        // Перенаправление в соответствующий личный кабинет
        switch (role) {
            case UserRole.EMPLOYER:
                navigate('/employer-dashboard');
                break;
            case UserRole.JOB_SEEKER:
                navigate('/job-seeker-dashboard');
                break;
            case UserRole.ADMIN:
                navigate('/admin-dashboard');
                break;
            case UserRole.INSTITUTE:
                navigate('/institute-dashboard');
                break;
            default:
                console.error('Неизвестная роль пользователя:', role);
                navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (token && status === LoadStatus.SUCCESS) {
            dispatch(getUserDataAction());
        }
    }, [token, status, dispatch]);

    useEffect(() => {
        if (userData && userDataStatus === LoadStatus.SUCCESS && userData.role) {
            redirectToUserCabinet(userData.role);
        }
    }, [userData, userDataStatus, redirectToUserCabinet]);
    
    return (
        <div className="authorization-proxy">
            <Loader />
        </div>
    )
}