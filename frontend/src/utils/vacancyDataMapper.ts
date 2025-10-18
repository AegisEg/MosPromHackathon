import { BackendVacancyData, VacancyData } from '../redux/vacancy/types';

// Функция для преобразования snake_case в camelCase
const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

// Функция для преобразования объекта из snake_case в camelCase
const snakeToCamelCase = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamelCase);
    }
    
    if (typeof obj === 'object') {
        const camelCaseObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
            const camelKey = toCamelCase(key);
            camelCaseObj[camelKey] = snakeToCamelCase(value);
        }
        return camelCaseObj;
    }
    
    return obj;
};

// Функция для маппинга данных вакансии с бэкенда в Redux формат
export const mapBackendVacancyDataToRedux = (backendData: BackendVacancyData): VacancyData => {
    return snakeToCamelCase(backendData) as VacancyData;
};

// Функция для маппинга массива вакансий
export const mapBackendVacanciesDataToRedux = (backendData: BackendVacancyData[]): VacancyData[] => {
    return backendData.map(mapBackendVacancyDataToRedux);
};

// Функция для преобразования данных вакансии в формат для отправки на бэкенд
export const mapVacancyDataToBackend = (vacancyData: Partial<VacancyData>): Partial<BackendVacancyData> => {
    const backendData: any = {};
    
    for (const [key, value] of Object.entries(vacancyData)) {
        if (value !== undefined) {
            // Преобразуем camelCase в snake_case
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            backendData[snakeKey] = value;
        }
    }
    
    return backendData;
};
