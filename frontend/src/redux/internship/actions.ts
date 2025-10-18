import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getInternships, 
    getInternshipById, 
    createInternship, 
    updateInternship, 
    deleteInternship 
} from '../../api/intership';
import { 
    mapBackendInternshipDataToRedux, 
    mapBackendInternshipsDataToRedux,
    mapInternshipDataToBackend 
} from '../../utils/internshipDataMapper';
import { CreateInternshipPayload, UpdateInternshipPayload } from './types';

// Получить все стажировки
export const getInternshipsAction = createAsyncThunk(
    'internship/getInternshipsAction',
    async (_, { rejectWithValue }) => {
        try {
            const backendData = await getInternships();
            console.log('backendData', backendData);
            const mappedInternships = mapBackendInternshipsDataToRedux(backendData);
            console.log('mappedInternships', mappedInternships);
            return { internships: mappedInternships };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении стажировок');
        }
    }
);

// Получить стажировку по ID
export const getInternshipByIdAction = createAsyncThunk(
    'internship/getInternshipByIdAction',
    async (id: number, { rejectWithValue }) => {
        try {
            const backendData = await getInternshipById(id);
            const mappedInternship = mapBackendInternshipDataToRedux(backendData);
            return { internship: mappedInternship };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении стажировки');
        }
    }
);

// Создать стажировку
export const createInternshipAction = createAsyncThunk(
    'internship/createInternshipAction',
    async (payload: CreateInternshipPayload, { rejectWithValue }) => {
        try {
            const backendPayload = mapInternshipDataToBackend(payload);
            const backendData = await createInternship(backendPayload as any);
            const mappedInternship = mapBackendInternshipDataToRedux(backendData);
            return { internship: mappedInternship };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при создании стажировки');
        }
    }
);

// Обновить стажировку
export const updateInternshipAction = createAsyncThunk(
    'internship/updateInternshipAction',
    async (payload: UpdateInternshipPayload, { rejectWithValue }) => {
        try {
            const { id, ...updateData } = payload;
            const backendPayload = mapInternshipDataToBackend(updateData as Omit<UpdateInternshipPayload, 'id'>);
            const backendData = await updateInternship(id, backendPayload as any);
            const mappedInternship = mapBackendInternshipDataToRedux(backendData);
            return { internship: mappedInternship };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при обновлении стажировки');
        }
    }
);

// Удалить стажировку
export const deleteInternshipAction = createAsyncThunk(
    'internship/deleteInternshipAction',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteInternship(id);
            return { id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при удалении стажировки');
        }
    }
);

