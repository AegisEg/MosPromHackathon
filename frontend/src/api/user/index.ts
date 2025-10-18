import api from "..";
import {AuthorizationPayload, RegistrationPayload} from "./types";
import { BackendUserData } from "../../redux/user/types";


export const getUserData = (): Promise<BackendUserData> => {
    return api
        .get('user/')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Get user data error:', error);
            throw error;
        });
}

export const registerUser = (payload: RegistrationPayload) => {
    return api
        .post('auth/register', payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Registration error:', error);
            throw error;
        });
}

export const authorizeUser = (payload: AuthorizationPayload) => {
    return api
        .post('auth/login', payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Login error:', error);
            throw error;
        });
}