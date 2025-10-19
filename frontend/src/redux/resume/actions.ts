import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getResumeById, 
    getUserResumes,
    createResume, 
    updateResume, 
    deleteResume 
} from '../../api/resume';
import { 
    CreateResumePayload, 
    UpdateResumePayload, 
    ResumeData 
} from './types';

// Получить все резюме пользователя
export const getUserResumesAction = createAsyncThunk<
    ResumeData[],
    void,
    { rejectValue: string }
>(
    'resume/getUserResumes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserResumes();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при получении резюме');
        }
    }
);

// Получить резюме по ID
export const getResumeAction = createAsyncThunk<
    ResumeData,
    number,
    { rejectValue: string }
>(
    'resume/getResume',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getResumeById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при получении резюме');
        }
    }
);
// Создать резюме
export const createResumeAction = createAsyncThunk<
    { resumeId: number },
    CreateResumePayload,
    { rejectValue: string }
>(  
    'resume/createResume',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await createResume(payload);
            return { resumeId: response.resume_id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при создании резюме');
        }
    }
);

// Обновить резюме
export const updateResumeAction = createAsyncThunk<
    { resumeId: number },
    UpdateResumePayload,
    { rejectValue: string }
>(
    'resume/updateResume',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await updateResume(payload);
            return { resumeId: response.resume_id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении резюме');
        }
    }
);

// Удалить резюме
export const deleteResumeAction = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    'resume/deleteResume',
    async (id, { rejectWithValue }) => {
        try {
            await deleteResume(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении резюме');
        }
    }
);

