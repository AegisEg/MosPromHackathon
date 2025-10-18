import { createAsyncThunk } from '@reduxjs/toolkit';
import { respondToVacancy } from '../../api/respond';

export const respondToVacancyAction = createAsyncThunk<
    { success: boolean; message: string },
    { vacancyId: number; resumeId: number; message?: string },
    { rejectValue: string }
>(
    'respond/respondToVacancy',
    async ({ vacancyId, resumeId, message }, { rejectWithValue }) => {
        try {
            const response = await respondToVacancy({ vacancyId, resumeId, message });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при отклике на вакансию');
        }
    }
);
