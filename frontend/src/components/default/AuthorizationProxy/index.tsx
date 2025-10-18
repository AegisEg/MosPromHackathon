import { useEffect } from "react";
import Loader from "../Loader"
import { selectAuthData, selectUserData } from "../../../redux/user/selectors";
import { useSelector } from "react-redux";
import { LoadStatus } from "../../../utils/types";
import { getUserData } from "../../../api/user";
import { getUserDataAction } from "../../../redux/user/actions";
import { useTypedDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";


export const AuthorizationProxy = () => {
    const dispatch = useTypedDispatch();

    const {token, status} = useSelector(selectAuthData);

    useEffect(() => {
        if (token && status === LoadStatus.SUCCESS) {
            dispatch(getUserDataAction());
        }
    }, [token, status]);
    
    return (
        <div className="authorization-proxy">
            <Loader />
        </div>
    )
}