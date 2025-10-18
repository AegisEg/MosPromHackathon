import { LoadStatus } from "../../utils/types";

// Данные стажировки в Redux (camelCase)
export interface InternshipData {
    id?: number;
    speciality?: string;
    countStudents?: number;
    startDatePeriod?: string;
    endDatePeriod?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Payload для создания стажировки
export interface CreateInternshipPayload {
    speciality: string;
    countStudents: number;
    startDatePeriod: string;
    endDatePeriod: string;
}

// Payload для обновления стажировки
export interface UpdateInternshipPayload {
    id: number;
    speciality?: string;
    countStudents?: number;
    startDatePeriod?: string;
    endDatePeriod?: string;
}

// Состояние Redux для стажировок
export interface InternshipState {
    internships: {
        status: LoadStatus;
        data: InternshipData[];
    };
    currentInternship: {
        status: LoadStatus;
        data: InternshipData | null;
    };
    createInternship: {
        status: LoadStatus;
        error: string | null;
    };
    updateInternship: {
        status: LoadStatus;
        error: string | null;
    };
    deleteInternship: {
        status: LoadStatus;
        error: string | null;
    };
}

