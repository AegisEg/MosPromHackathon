import { BackendProfessionData, ProfessionData, BackendSkillData, SkillData } from '../redux/profession/types';

// Функция для маппинга данных профессии с бэкенда в Redux формат
export const mapBackendProfessionDataToRedux = (backendData: BackendProfessionData): ProfessionData => {
    return {
        id: backendData.id,
        name: backendData.name,
    };
};

// Функция для маппинга массива профессий
export const mapBackendProfessionsDataToRedux = (backendData: BackendProfessionData[]): ProfessionData[] => {
    return backendData.map(mapBackendProfessionDataToRedux);
};

// Функция для маппинга данных навыка с бэкенда в Redux формат
export const mapBackendSkillDataToRedux = (backendData: BackendSkillData): SkillData => {
    return {
        id: backendData.id,
        name: backendData.name,
    };
};

// Функция для маппинга массива навыков
export const mapBackendSkillsDataToRedux = (backendData: BackendSkillData[]): SkillData[] => {
    return backendData.map(mapBackendSkillDataToRedux);
};
