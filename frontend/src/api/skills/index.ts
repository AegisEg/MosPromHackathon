import api from "..";
import { BackendSkillData } from "../../redux/profession/types";

// Получить все навыки
export const getSkills = (): Promise<BackendSkillData[]> => {
    return api
        .get('skills')
        .then((response) => {
            console.log('Skills API response:', response.data);
            // Извлекаем массив навыков из response.data.data
            return response.data.data || [];
        })
        .catch((error) => {
            console.error('Get skills error:', error);
            throw error;
        });
};
