import { BackendVacancyData, CreateVacancyPayload, UpdateVacancyPayload } from '../../redux/vacancy/types';

export interface VacancyResponse {
    data: BackendVacancyData;
}

export interface VacanciesResponse {
    data: BackendVacancyData[];
}

export interface CreateVacancyRequest {
    title: string;
    description: string;
    company_id: number;
    profession_id: number;
    employment_type: number;
    experience_wide: number;
    salary_from: number;
    salary_to: number;
    status: boolean;
    skills: number[];
}

export interface UpdateVacancyRequest {
    title?: string;
    description?: string;
    company_id?: number;
    profession_id?: number;
    employment_type?: number;
    experience_wide?: number;
    salary_from?: number;
    salary_to?: number;
    status?: boolean;
    skills?: number[];
}
