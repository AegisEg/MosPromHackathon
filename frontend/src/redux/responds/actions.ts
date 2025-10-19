import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRespondsByVacancy, updateRespondStatus, getBestMatches, getAIMatches, RespondData, BestMatchData, AIMatchData } from '../../api/responds';

// Получить отклики на вакансию
export const getRespondsByVacancyAction = createAsyncThunk(
    'responds/getRespondsByVacancyAction',
    async (vacancyId: number, { rejectWithValue }) => {
        try {
            const response = await getRespondsByVacancy(vacancyId);
            return { vacancyId, responds: response.resumes };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении откликов');
        }
    }
);

// Обновить статус отклика
export const updateRespondStatusAction = createAsyncThunk(
    'responds/updateRespondStatusAction',
    async ({ respondId, status }: { respondId: number; status: string }, { rejectWithValue }) => {
        try {
            await updateRespondStatus(respondId, status);
            return { respondId, status };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при обновлении статуса отклика');
        }
    }
);

// Получить лучшие совпадения для вакансии
export const getBestMatchesAction = createAsyncThunk(
    'responds/getBestMatchesAction',
    async (vacancyId: number, { rejectWithValue }) => {
        try {
            const response = await getBestMatches(vacancyId);
            return { vacancyId, bestMatches: response.top_matches };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении лучших совпадений');
        }
    }
);

// Получить AI совпадения для вакансии
export const getAIMatchesAction = createAsyncThunk(
    'responds/getAIMatchesAction',
    async (vacancyId: number, { rejectWithValue }) => {
        try {
            const response = await getAIMatches(vacancyId);
            console.log('Redux action - AI matches response:', response);
            console.log('Redux action - AI matches array:', response.ai_matches);
            return { vacancyId, aiMatches: response.ai_matches };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении AI совпадений');
        }
    }
);
