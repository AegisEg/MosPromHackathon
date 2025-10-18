import { LoadStatus } from "../../utils/types";

// Enum для типов занятости
export enum EmploymentType {
    FULL_TIME = 1,
    PART_TIME = 2,
    CONTRACT = 3,
    INTERNSHIP = 4,
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
    employment_type?: number;
    experience_wide?: number;
    salary_from?: number;
    salary_to?: number;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
    skills?: number[];
}

// Данные в Redux с маппингом в camelCase
export interface VacancyData {
    id?: number;
    userId?: number;
    title?: string;
    description?: string;
    companyId?: number;
    professionId?: number;
    employmentType?: EmploymentType;
    experienceWide?: ExperienceLevel;
    salaryFrom?: number;
    salaryTo?: number;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    skills?: number[];
}

// Payload для создания вакансии
export interface CreateVacancyPayload {
    title: string;
    description: string;
    companyId: number;
    professionId: number;
    employmentType: EmploymentType;
    experienceWide: ExperienceLevel;
    salaryFrom: number;
    salaryTo: number;
    status: boolean;
    skills: number[];
}

// Payload для обновления вакансии
export interface UpdateVacancyPayload {
    id: number;
    title?: string;
    description?: string;
    companyId?: number;
    professionId?: number;
    employmentType?: EmploymentType;
    experienceWide?: ExperienceLevel;
    salaryFrom?: number;
    salaryTo?: number;
    status?: boolean;
    skills?: number[];
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
