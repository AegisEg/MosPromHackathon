import { LoadStatus } from "../../utils/types";

// Данные с бэкенда в snake_case
export interface BackendResumeData {
    id?: number;
    user_id?: number;
    date_of_birth?: string;
    city?: string;
    country?: string;
    education?: string;
    phone?: string;
    about?: string;
    profession_id?: number;
    salary?: number;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
    skills?: number[];
    educations?: BackendEducationData[];
    experiences?: BackendExperienceData[];
}

export interface BackendEducationData {
    id?: number;
    resume_id?: number;
    institution_name?: string;
    degree?: string;
    specialization?: string;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface BackendExperienceData {
    id?: number;
    resume_id?: number;
    company_name?: string;
    position?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

// Данные в Redux с маппингом в camelCase
export interface ResumeData {
    id?: number;
    userId?: number;
    dateOfBirth?: string;
    city?: string;
    country?: string;
    education?: string;
    phone?: string;
    about?: string;
    professionId?: number;
    salary?: number;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    skills?: number[];
    educations?: EducationData[];
    experiences?: ExperienceData[];
}

export interface EducationData {
    id?: number;
    resumeId?: number;
    institutionName?: string;
    degree?: string;
    specialization?: string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ExperienceData {
    id?: number;
    resumeId?: number;
    companyName?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Payload для создания резюме
export interface CreateResumePayload {
    dateOfBirth: string;
    city: string;
    country: string;
    education: string;
    phone: string;
    about: string;
    professionId: number;
    salary?: number;
    status?: boolean;
    skills?: number[];
    educations?: Omit<EducationData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>[];
    experiences?: Omit<ExperienceData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>[];
}

// Payload для обновления резюме
export interface UpdateResumePayload {
    id: number;
    dateOfBirth?: string;
    city?: string;
    country?: string;
    education?: string;
    phone?: string;
    about?: string;
    professionId?: number;
    salary?: number;
    status?: boolean;
    skills?: number[];
    educations?: Omit<EducationData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>[];
    experiences?: Omit<ExperienceData, 'id' | 'resumeId' | 'createdAt' | 'updatedAt'>[];
}

// Состояние Redux для резюме
export interface ResumeState {
    resumes: {
        status: LoadStatus;
        data: ResumeData[];
    };
    currentResume: {
        status: LoadStatus;
        data: ResumeData | null;
    };
    createResume: {
        status: LoadStatus;
        error: string | null;
    };
    updateResume: {
        status: LoadStatus;
        error: string | null;
    };
    deleteResume: {
        status: LoadStatus;
        error: string | null;
    };
}
