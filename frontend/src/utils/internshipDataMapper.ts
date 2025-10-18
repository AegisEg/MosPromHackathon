import { BackendInternshipData } from '../api/intership/types';
import { InternshipData, CreateInternshipPayload, UpdateInternshipPayload } from '../redux/internship/types';

// Маппер: бэкенд → Redux (snake_case → camelCase)
export const mapBackendInternshipDataToRedux = (backendData: BackendInternshipData): InternshipData => {
    return {
        id: backendData.id,
        speciality: backendData.speciality,
        countStudents: backendData.count_students,
        startDatePeriod: backendData.start_date_period,
        endDatePeriod: backendData.end_date_period,
        createdAt: backendData.created_at,
        updatedAt: backendData.updated_at,
    };
};

// Маппер массива: бэкенд → Redux
export const mapBackendInternshipsDataToRedux = (backendData: BackendInternshipData[]): InternshipData[] => {
    return backendData.map(mapBackendInternshipDataToRedux);
};

// Маппер: Redux → бэкенд (camelCase → snake_case)
export const mapInternshipDataToBackend = (
    reduxData: CreateInternshipPayload | Omit<UpdateInternshipPayload, 'id'>
): Partial<BackendInternshipData> => {
    const result: Partial<BackendInternshipData> = {};

    if ('speciality' in reduxData && reduxData.speciality !== undefined) {
        result.speciality = reduxData.speciality;
    }
    if ('countStudents' in reduxData && reduxData.countStudents !== undefined) {
        result.count_students = reduxData.countStudents;
    }
    if ('startDatePeriod' in reduxData && reduxData.startDatePeriod !== undefined) {
        result.start_date_period = reduxData.startDatePeriod;
    }
    if ('endDatePeriod' in reduxData && reduxData.endDatePeriod !== undefined) {
        result.end_date_period = reduxData.endDatePeriod;
    }

    return result;
};

