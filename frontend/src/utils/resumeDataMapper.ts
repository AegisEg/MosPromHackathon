import { 
    BackendResumeData, 
    ResumeData, 
    BackendEducationData, 
    EducationData, 
    BackendExperienceData, 
    ExperienceData 
} from '../redux/resume/types';

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

// Функция для маппинга данных резюме с бэкенда в Redux формат
export const mapBackendResumeDataToRedux = (backendData: BackendResumeData): ResumeData => {
    return snakeToCamelCase(backendData) as ResumeData;
};

// Функция для маппинга массива резюме
export const mapBackendResumesDataToRedux = (backendData: BackendResumeData[]): ResumeData[] => {
    return backendData.map(mapBackendResumeDataToRedux);
};

// Функция для преобразования данных резюме в формат для отправки на бэкенд
export const mapResumeDataToBackend = (resumeData: Partial<ResumeData>): Partial<BackendResumeData> => {
    const backendData: any = {};
    
    for (const [key, value] of Object.entries(resumeData)) {
        if (value !== undefined) {
            // Преобразуем camelCase в snake_case
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            backendData[snakeKey] = value;
        }
    }
    
    return backendData;
};

// Функция для маппинга образования
export const mapBackendEducationDataToRedux = (backendData: BackendEducationData): EducationData => {
    return snakeToCamelCase(backendData) as EducationData;
};

// Функция для маппинга опыта работы
export const mapBackendExperienceDataToRedux = (backendData: BackendExperienceData): ExperienceData => {
    return snakeToCamelCase(backendData) as ExperienceData;
};
