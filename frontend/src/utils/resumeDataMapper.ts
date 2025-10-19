import { 
    BackendResumeData, 
    ResumeData, 
    BackendEducationData, 
    EducationData, 
    BackendExperienceData, 
    ExperienceData,
    CreateResumePayload,
    UpdateResumePayload
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
    const mappedData = snakeToCamelCase(backendData) as ResumeData;
    
    // Преобразуем profession в professionId (если profession - это строка с ID)
    if (mappedData.profession && typeof mappedData.profession === 'string') {
        const professionId = parseInt(mappedData.profession);
        if (!isNaN(professionId)) {
            mappedData.professionId = professionId;
        }
    }
    
    // Оставляем skills как объекты с id и name для отображения
    // Преобразование в ID происходит только при отправке на бэкенд
    
    return mappedData;
};

// Функция для маппинга массива резюме
export const mapBackendResumesDataToRedux = (backendData: BackendResumeData[]): ResumeData[] => {
    return backendData.map(mapBackendResumeDataToRedux);
};

// Функция для преобразования camelCase в snake_case
const toSnakeCase = (str: string): string => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

// Функция для преобразования объекта из camelCase в snake_case
const camelToSnakeCase = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(camelToSnakeCase);
    }
    
    if (typeof obj === 'object') {
        const snakeCaseObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
            const snakeKey = toSnakeCase(key);
            snakeCaseObj[snakeKey] = camelToSnakeCase(value);
        }
        return snakeCaseObj;
    }
    
    return obj;
};

// Функция для преобразования данных резюме в формат для отправки на бэкенд
export const mapResumeDataToBackend = (resumeData: Partial<ResumeData>): Partial<BackendResumeData> => {
    const backendData = camelToSnakeCase(resumeData) as any;
    
    // Специальная обработка для skills - преобразуем объекты в ID для отправки на бэкенд
    if (backendData.skills && Array.isArray(backendData.skills)) {
        backendData.skills = backendData.skills.map((skill: any) => {
            // Если skill - это объект с id, берем id
            if (typeof skill === 'object' && skill.id) {
                return skill.id;
            }
            // Если skill - это уже число, возвращаем как есть
            return skill;
        }).filter((skillId: any) => typeof skillId === 'number' && !isNaN(skillId));
    }
    
    return backendData;
};

// Функция для преобразования CreateResumePayload в формат для отправки на бэкенд
export const mapCreateResumePayloadToBackend = (payload: CreateResumePayload): any => {
    const backendData = camelToSnakeCase(payload) as any;
    
    // Навыки уже приходят как ID, просто фильтруем их
    if (backendData.skills && Array.isArray(backendData.skills)) {
        backendData.skills = backendData.skills.filter((skillId: any) => typeof skillId === 'number' && !isNaN(skillId));
    }
    
    return backendData;
};

// Функция для преобразования UpdateResumePayload в формат для отправки на бэкенд
export const mapUpdateResumePayloadToBackend = (payload: Omit<UpdateResumePayload, 'id'>): any => {
    const backendData = camelToSnakeCase(payload) as any;
    
    // Навыки уже приходят как ID, просто фильтруем их
    if (backendData.skills && Array.isArray(backendData.skills)) {
        backendData.skills = backendData.skills.filter((skillId: any) => typeof skillId === 'number' && !isNaN(skillId));
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
