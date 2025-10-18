import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} from '../../api/company';
import { 
    mapBackendCompanyDataToRedux, 
    mapBackendCompaniesDataToRedux 
} from '../../utils/companyDataMapper';
import { mapCompanyDataToBackend } from '../../utils/companyDataMapper';
import { CreateCompanyPayload, UpdateCompanyPayload } from './types';

// Получить все компании
export const getCompaniesAction = createAsyncThunk(
    'company/getCompaniesAction',
    async (_, { rejectWithValue }) => {
        try {
            const backendData = await getCompanies();
            console.log('backendData', backendData);
            const mappedCompanies = mapBackendCompaniesDataToRedux(backendData);
            console.log('mappedCompanies', mappedCompanies);
            return { companies: mappedCompanies };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении компаний');
        }
    }
);

// Получить компанию по ID
export const getCompanyByIdAction = createAsyncThunk(
    'company/getCompanyByIdAction',
    async (id: number, { rejectWithValue }) => {
        try {
            const backendData = await getCompanyById(id);
            const mappedCompany = mapBackendCompanyDataToRedux(backendData);
            return { company: mappedCompany };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении компании');
        }
    }
);

// Создать компанию
export const createCompanyAction = createAsyncThunk(
    'company/createCompanyAction',
    async (payload: CreateCompanyPayload, { rejectWithValue }) => {
        try {
            const backendPayload = mapCompanyDataToBackend(payload);
            const backendData = await createCompany(backendPayload as any);
            const mappedCompany = mapBackendCompanyDataToRedux(backendData);
            return { company: mappedCompany };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при создании компании');
        }
    }
);

// Обновить компанию
export const updateCompanyAction = createAsyncThunk(
    'company/updateCompanyAction',
    async (payload: UpdateCompanyPayload, { rejectWithValue }) => {
        try {
            const { id, ...updateData } = payload;
            const backendPayload = mapCompanyDataToBackend(updateData);
            const backendData = await updateCompany(id, backendPayload as any);
            const mappedCompany = mapBackendCompanyDataToRedux(backendData);
            return { company: mappedCompany };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при обновлении компании');
        }
    }
);

// Удалить компанию
export const deleteCompanyAction = createAsyncThunk(
    'company/deleteCompanyAction',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteCompany(id);
            return { id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при удалении компании');
        }
    }
);
