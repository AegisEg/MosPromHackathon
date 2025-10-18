import api from "..";
import { BackendVacancyData } from "../../redux/vacancy/types";
import { CreateVacancyRequest, UpdateVacancyRequest } from "./types";
import { mapVacancyDataToBackend } from "../../utils/vacancyDataMapper";

// Получить все вакансии
export const getVacancies = (): Promise<BackendVacancyData[]> => {
    return api
        .get('vacancies')
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем массив вакансий из response.data.data
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get vacancies error:', error);
            throw error;
        });
};

// Получить вакансию по ID
export const getVacancyById = (id: number): Promise<BackendVacancyData> => {
    return api
        .get(`vacancies/${id}`)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные вакансии из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Get vacancy error:', error);
            throw error;
        });
};

// Создать вакансию
export const createVacancy = (payload: CreateVacancyRequest): Promise<BackendVacancyData> => {
    return api
        .post('vacancies', payload)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные вакансии из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Create vacancy error:', error);
            throw error;
        });
};

// Обновить вакансию
export const updateVacancy = (id: number, payload: UpdateVacancyRequest): Promise<BackendVacancyData> => {
    return api
        .put(`vacancies/${id}`, payload)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные вакансии из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Update vacancy error:', error);
            throw error;
        });
};

// Удалить вакансию
export const deleteVacancy = (id: number): Promise<void> => {
    return api
        .delete(`vacancies/${id}`)
        .then(() => {
            return;
        })
        .catch((error) => {
            console.error('Delete vacancy error:', error);
            throw error;
        });
};
