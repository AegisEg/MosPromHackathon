import { LoadStatus } from "../../utils/types";

// Данные с бэкенда
export interface BackendProfessionData {
    id: number;
    name: string;
}

export interface BackendSkillData {
    id: number;
    name: string;
}

// Данные в Redux
export interface ProfessionData {
    id: number;
    name: string;
}

export interface SkillData {
    id: number;
    name: string;
}

// Состояние Redux для профессий
export interface ProfessionState {
    professions: {
        status: LoadStatus;
        data: ProfessionData[];
    };
    currentProfessionSkills: {
        status: LoadStatus;
        data: SkillData[];
    };
}
