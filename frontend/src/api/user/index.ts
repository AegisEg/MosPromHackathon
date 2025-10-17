import api from "..";
import {Response} from '../types';
import {AuthorizationPayload, AuthorizationResponse, RegistrationPayload, RegistrationResponse} from "./types";


export const registerUser = (payload: RegistrationPayload) => {
    return api
        .post('auth/register', payload)
        .then((response: Response<RegistrationResponse>) => {
            console.log('response', response.data);
            return response.data.data;
        })
    }

export const authorizeUser = (payload: AuthorizationPayload) => {
    return api
        .post('auth/login', {})
        .then((response: Response<AuthorizationResponse>) => {
            return response.data.data;
        });
}