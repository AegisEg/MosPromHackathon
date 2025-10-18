import { LoadStatus } from "../../utils/types";

// Данные с бэкенда в snake_case
export interface BackendCompanyData {
    id?: number;
    user_id?: number;
    name?: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logo_url?: string;
    created_at?: string;
    updated_at?: string;
}

// Данные в Redux с маппингом в camelCase
export interface CompanyData {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Payload для создания компании
export interface CreateCompanyPayload {
    name: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logoUrl?: string;
}

// Payload для обновления компании
export interface UpdateCompanyPayload {
    id: number;
    name?: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logoUrl?: string;
}

// Состояние Redux для компаний
export interface CompanyState {
    companies: {
        status: LoadStatus;
        data: CompanyData[];
    };
    currentCompany: {
        status: LoadStatus;
        data: CompanyData | null;
    };
    createCompany: {
        status: LoadStatus;
        error: string | null;
    };
    updateCompany: {
        status: LoadStatus;
        error: string | null;
    };
    deleteCompany: {
        status: LoadStatus;
        error: string | null;
    };
}
