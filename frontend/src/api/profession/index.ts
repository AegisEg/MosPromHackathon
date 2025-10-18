import api from "..";
import { BackendProfessionData, BackendSkillData } from "../../redux/profession/types";

// Получить все профессии
export const getProfessions = (): Promise<BackendProfessionData[]> => {
    return api
        .get('professions')
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем массив профессий из response.data.data
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get professions error:', error);
            throw error;
        });
};

// Получить профессию по ID
export const getProfessionById = (id: number): Promise<BackendProfessionData> => {
    return api
        .get(`professions/${id}`)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем данные профессии из response.data.data
            return response.data.data || response.data;
        })
        .catch((error) => {
            console.error('Get profession error:', error);
            throw error;
        });
};

// Получить навыки для профессии
export const getProfessionSkills = (id: number): Promise<BackendSkillData[]> => {
    return api
        .get(`professions/${id}/skills`)
        .then((response) => {
            console.log('API response:', response.data);
            // Извлекаем массив навыков из response.data.data
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get profession skills error:', error);
            throw error;
        });
};
