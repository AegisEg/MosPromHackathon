import api from "..";
import { BackendInternshipData, CreateInternshipRequest, UpdateInternshipRequest } from "./types";

// Получить все стажировки
export const getInternships = (): Promise<BackendInternshipData[]> => {
    return api
        .get('internships')
        .then((response) => {
            console.log('Get internships API response:', response.data);
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get internships error:', error);
            throw error;
        });
};

// Получить стажировку по ID
export const getInternshipById = (id: number): Promise<BackendInternshipData> => {
    return api
        .get(`internships/${id}`)
        .then((response) => {
            console.log('Get internship API response:', response.data);
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Get internship error:', error);
            throw error;
        });
};

// Создать стажировку
export const createInternship = (payload: CreateInternshipRequest): Promise<BackendInternshipData> => {
    return api
        .post('internships', payload)
        .then((response) => {
            console.log('Create internship API response:', response.data);
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Create internship error:', error);
            throw error;
        });
};

// Обновить стажировку
export const updateInternship = (id: number, payload: UpdateInternshipRequest): Promise<BackendInternshipData> => {
    return api
        .put(`internships/${id}`, payload)
        .then((response) => {
            console.log('Update internship API response:', response.data);
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Update internship error:', error);
            throw error;
        });
};

// Удалить стажировку
export const deleteInternship = (id: number): Promise<void> => {
    return api
        .delete(`internships/${id}`)
        .then(() => {
            return;
        })
        .catch((error) => {
            console.error('Delete internship error:', error);
            throw error;
        });
};
