import api from "..";
import { BackendCompanyData } from "../../redux/company/types";
import { CreateCompanyRequest, UpdateCompanyRequest } from "./types";
import { mapCompanyDataToBackend } from "../../utils/companyDataMapper";

// Получить все компании
export const getCompanies = (): Promise<BackendCompanyData[]> => {
    return api
        .get('companies')
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем массив компаний из response.data.data
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get companies error:', error);
            throw error;
        });
};

// Получить компанию по ID
export const getCompanyById = (id: number): Promise<BackendCompanyData> => {
    return api
        .get(`companies/${id}`)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные компании из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Get company error:', error);
            throw error;
        });
};

// Создать компанию
export const createCompany = (payload: CreateCompanyRequest): Promise<BackendCompanyData> => {
    return api
        .post('companies/store', payload)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные компании из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Create company error:', error);
            throw error;
        });
};

// Обновить компанию
export const updateCompany = (id: number, payload: UpdateCompanyRequest): Promise<BackendCompanyData> => {
    return api
        .patch(`companies/update/${id}`, payload)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные компании из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Update company error:', error);
            throw error;
        });
};

// Удалить компанию
export const deleteCompany = (id: number): Promise<void> => {
    return api
        .delete(`companies/delete/${id}`)
        .then(() => {
            return;
        })
        .catch((error) => {
            console.error('Delete company error:', error);
            throw error;
        });
};
