// Данные стажировки с бэкенда (в snake_case)
export interface BackendInternshipData {
    id: number;
    speciality: string;
    count_students: number;
    start_date_period: string;
    end_date_period: string;
    created_at?: string;
    updated_at?: string;
}

export interface InternshipResponse {
    data: BackendInternshipData;
}

export interface InternshipsResponse {
    data: BackendInternshipData[];
}

export interface CreateInternshipRequest {
    speciality: string;
    count_students: number;
    start_date_period: string;
    end_date_period: string;
}

export interface UpdateInternshipRequest {
    speciality?: string;
    count_students?: number;
    start_date_period?: string;
    end_date_period?: string;
}
