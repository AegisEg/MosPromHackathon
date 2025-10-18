import { UserRole } from '../enums/UserRole';
import { BackendUserData, UserData } from '../redux/user/types';

// Маппинг ролей с бэкенда на enum
const roleMapping: { [key: number]: UserRole } = {
    1: UserRole.EMPLOYER,
    2: UserRole.JOB_SEEKER,
    3: UserRole.ADMIN,
    4: UserRole.INSTITUTE,
};

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

// Функция для маппинга данных пользователя с бэкенда в Redux формат
export const mapBackendUserDataToRedux = (backendData: BackendUserData): UserData => {
    // Сначала преобразуем snake_case в camelCase
    const camelCaseData = snakeToCamelCase(backendData) as any;
    
    // Затем маппим роль
    const mappedData: UserData = {
        ...camelCaseData,
        role: backendData.role ? roleMapping[backendData.role] : undefined,
    };
    
    return mappedData;
};

// Функция для получения числовой роли из enum (для обратного маппинга)
export const getRoleNumber = (role: UserRole): number => {
    const reverseMapping: { [key in UserRole]: number } = {
        [UserRole.EMPLOYER]: 1,
        [UserRole.JOB_SEEKER]: 2,
        [UserRole.ADMIN]: 3,
        [UserRole.INSTITUTE]: 4,
    };
    
    return reverseMapping[role];
};
