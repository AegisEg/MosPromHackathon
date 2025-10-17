import {AxiosError, AxiosResponse} from "axios";

export type Response<T = any> = AxiosResponse<ResponsePayload>;

export type ResponsePayload<T = any> = {
    status: string;
    data: T;
};

export type ErrorResponse = AxiosError<ErrorResponsePayload>;

export type ErrorResponsePayload = {
    status: string;
    data: {
        status: string;
        error: {
            message: string;
            code: number;
        };
    };
};