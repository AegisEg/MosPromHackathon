import {AxiosResponse} from "axios";

export type Response<T = any> = AxiosResponse<{
    status: string;
    data: T;
}>;