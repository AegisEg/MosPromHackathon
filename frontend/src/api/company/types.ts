import { BackendCompanyData, CreateCompanyPayload, UpdateCompanyPayload } from '../../redux/company/types';

export interface CompanyResponse {
    data: BackendCompanyData;
}

export interface CompaniesResponse {
    data: BackendCompanyData[];
}

export interface CreateCompanyRequest {
    name: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logo_url?: string;
}

export interface UpdateCompanyRequest {
    name?: string;
    description?: string;
    website?: string;
    size?: number;
    city?: string;
    country?: string;
    logo_url?: string;
}
