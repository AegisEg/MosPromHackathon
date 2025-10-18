import axios from 'axios';
import {configuration} from "../utils/configuration";
import { LocalStorageKeys } from '../utils/localStorage';

const api = axios.create({
    baseURL: configuration.apiURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn('Не авторизован');
            }
            if (error.response.status >= 500) {
                console.error('Ошибка сервера:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);


export default api;
