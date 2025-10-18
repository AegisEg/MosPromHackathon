import api from "..";

// Вспомогательная функция для удаления пустых значений
const removeEmptyParams = (params: any): any => {
    const cleaned: any = {};
    
    Object.keys(params).forEach((key) => {
        const value = params[key];
        // Пропускаем null, undefined, пустые строки
        if (value !== null && value !== undefined && value !== '') {
            cleaned[key] = value;
        }
    });
    
    return cleaned;
};

// Параметры поиска вакансий
export interface SearchVacanciesParams {
    title?: string;
    company_id?: number;
    profession_id?: number;
    description?: string;
    employment_type?: number;
    experience_wide?: number;
    salary_from?: number;
    salary_to?: number;
    user_id?: number;
    skills?: string;
}

// Параметры поиска стажировок
export interface SearchInternshipsParams {
    speciality?: string;
    count_students_from?: number;
    count_students_to?: number;
    start_date_from?: string;
    start_date_to?: string;
    end_date_from?: string;
    end_date_to?: string;
    user_id?: number;
}

// Поиск вакансий
export const searchVacancies = (params: SearchVacanciesParams): Promise<any> => {
    const cleanedParams = removeEmptyParams(params);
    
    return api
        .get('search/vacancies', { params: cleanedParams })
        .then((response) => {
            console.log('Search vacancies API response:', response.data);
            return response.data.data || {};
        })
        .catch((error) => {
            console.error('Search vacancies error:', error);
            throw error;
        });
};

// Поиск стажировок
export const searchInternships = (params: SearchInternshipsParams): Promise<any> => {
    const cleanedParams = removeEmptyParams(params);
    
    return api
        .get('search/internships', { params: cleanedParams })
        .then((response) => {
            console.log('Search internships API response:', response.data);
            return response.data.data || {};
        })
        .catch((error) => {
            console.error('Search internships error:', error);
            throw error;
        });
};
