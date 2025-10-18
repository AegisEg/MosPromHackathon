import { useEffect } from "react";
import Loader from "../Loader"
import { selectAuthData, selectUserData } from "../../../redux/user/selectors";
import { useSelector } from "react-redux";
import { LoadStatus } from "../../../utils/types";
import { getUserDataAction } from "../../../redux/user/actions";
import { useTypedDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import './style.scss';

export const AuthorizationProxy = () => {
    const navigate = useNavigate();
    
    const {data: userData, status: userDataStatus} = useSelector(selectUserData);


    useEffect(() => {
        if (userData && userDataStatus === LoadStatus.SUCCESS) {
            navigate('/lk');
        }
    }, [userData, userDataStatus, navigate]);
    
    return (
        <div className="authorization-proxy">
            <Loader />
        </div>
    )
}