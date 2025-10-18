import { BackendCompanyData, CompanyData } from '../redux/company/types';

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

// Функция для маппинга данных компании с бэкенда в Redux формат
export const mapBackendCompanyDataToRedux = (backendData: BackendCompanyData): CompanyData => {
    return snakeToCamelCase(backendData) as CompanyData;
};

// Функция для маппинга массива компаний
export const mapBackendCompaniesDataToRedux = (backendData: BackendCompanyData[]): CompanyData[] => {
    return backendData.map(mapBackendCompanyDataToRedux);
};

// Функция для преобразования данных компании в формат для отправки на бэкенд
export const mapCompanyDataToBackend = (companyData: Partial<CompanyData>): Partial<BackendCompanyData> => {
    const backendData: any = {};
    
    for (const [key, value] of Object.entries(companyData)) {
        if (value !== undefined) {
            // Преобразуем camelCase в snake_case
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            backendData[snakeKey] = value;
        }
    }
    
    return backendData;
};
