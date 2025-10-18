import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getVacancies, 
    getVacancyById, 
    createVacancy, 
    updateVacancy, 
    deleteVacancy 
} from '../../api/vacancy';
import { 
    mapBackendVacancyDataToRedux, 
    mapBackendVacanciesDataToRedux 
} from '../../utils/vacancyDataMapper';
import { mapVacancyDataToBackend } from '../../utils/vacancyDataMapper';
import { CreateVacancyPayload, UpdateVacancyPayload } from './types';

// Получить все вакансии
export const getVacanciesAction = createAsyncThunk(
    'vacancy/getVacanciesAction',
    async (_, { rejectWithValue }) => {
        try {
            const backendData = await getVacancies();
            console.log('backendData', backendData);
            const mappedVacancies = mapBackendVacanciesDataToRedux(backendData);
            console.log('mappedVacancies', mappedVacancies);
            return { vacancies: mappedVacancies };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении вакансий');
        }
    }
);

// Получить вакансию по ID
export const getVacancyByIdAction = createAsyncThunk(
    'vacancy/getVacancyByIdAction',
    async (id: number, { rejectWithValue }) => {
        try {
            const backendData = await getVacancyById(id);
            const mappedVacancy = mapBackendVacancyDataToRedux(backendData);
            return { vacancy: mappedVacancy };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении вакансии');
        }
    }
);

// Создать вакансию
export const createVacancyAction = createAsyncThunk(
    'vacancy/createVacancyAction',
    async (payload: CreateVacancyPayload, { rejectWithValue }) => {
        try {
            const backendPayload = mapVacancyDataToBackend(payload);
            const backendData = await createVacancy(backendPayload as any);
            const mappedVacancy = mapBackendVacancyDataToRedux(backendData);
            return { vacancy: mappedVacancy };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при создании вакансии');
        }
    }
);

// Обновить вакансию
export const updateVacancyAction = createAsyncThunk(
    'vacancy/updateVacancyAction',
    async (payload: UpdateVacancyPayload, { rejectWithValue }) => {
        try {
            const { id, ...updateData } = payload;
            const backendPayload = mapVacancyDataToBackend(updateData);
            const backendData = await updateVacancy(id, backendPayload as any);
            const mappedVacancy = mapBackendVacancyDataToRedux(backendData);
            return { vacancy: mappedVacancy };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при обновлении вакансии');
        }
    }
);

// Удалить вакансию
export const deleteVacancyAction = createAsyncThunk(
    'vacancy/deleteVacancyAction',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteVacancy(id);
            return { id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при удалении вакансии');
        }
    }
);
