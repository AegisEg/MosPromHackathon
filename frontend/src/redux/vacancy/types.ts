import { LoadStatus } from "../../utils/types";

// Enum для типов занятости
export enum EmploymentType {
    FULL_TIME = 1,
    PART_TIME = 2,
    CONTRACT = 3,
    FREELANCE = 5,
}

// Enum для уровней опыта
export enum ExperienceLevel {
    NO_EXPERIENCE = 0,
    JUNIOR = 12,
    MIDDLE = 36,
    SENIOR = 60,
    LEAD = 120,
}

// Данные с бэкенда в snake_case
export interface BackendVacancyData {
    id?: number;
    user_id?: number;
    title?: string;
    description?: string;
    company_id?: number;
    profession_id?: number;
    company_name?: string;
    profession?: string;
    employment_type?: string;
    experience_wide?: string;
    salary_from?: number;
    salary_to?: number;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
    skills?: string[];
    responds_count?: number;
}

// Данные в Redux с маппингом в camelCase
export interface VacancyData {
    id?: number;
    userId?: number;
    title?: string;
    description?: string;
    companyId?: number;
    professionId?: number;
    companyName?: string;
    profession?: string;
    employmentType?: string;
    experienceWide?: string;
    salaryFrom?: number;
    salaryTo?: number;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    skills?: string[];
    respondsCount?: number;
}

// Payload для создания вакансии
export interface CreateVacancyPayload {
    title: string;
    description: string;
    companyId: number;
    professionId: number;
    employmentType: string;
    experienceWide: string;
    salaryFrom: number;
    salaryTo: number;
    status: boolean;
    skills: string[];
}

// Payload для обновления вакансии
export interface UpdateVacancyPayload {
    id: number;
    title?: string;
    description?: string;
    companyId?: number;
    professionId?: number;
    employmentType?: string;
    experienceWide?: string;
    salaryFrom?: number;
    salaryTo?: number;
    status?: boolean;
    skills?: string[];
}

// Состояние Redux для вакансий
export interface VacancyState {
    vacancies: {
        status: LoadStatus;
        data: VacancyData[];
    };
    currentVacancy: {
        status: LoadStatus;
        data: VacancyData | null;
    };
    createVacancy: {
        status: LoadStatus;
        error: string | null;
    };
    updateVacancy: {
        status: LoadStatus;
        error: string | null;
    };
    deleteVacancy: {
        status: LoadStatus;
        error: string | null;
    };
}
