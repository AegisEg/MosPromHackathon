import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getProfessions, 
    getProfessionById, 
    getProfessionSkills 
} from '../../api/profession';
import { 
    mapBackendProfessionDataToRedux, 
    mapBackendProfessionsDataToRedux,
    mapBackendSkillDataToRedux,
    mapBackendSkillsDataToRedux
} from '../../utils/professionDataMapper';

// Получить все профессии
export const getProfessionsAction = createAsyncThunk(
    'profession/getProfessionsAction',
    async (_, { rejectWithValue }) => {
        try {
            const backendData = await getProfessions();
            console.log('backendData', backendData);
            const mappedProfessions = mapBackendProfessionsDataToRedux(backendData);
            console.log('mappedProfessions', mappedProfessions);
            return { professions: mappedProfessions };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении профессий');
        }
    }
);

// Получить профессию по ID
export const getProfessionByIdAction = createAsyncThunk(
    'profession/getProfessionByIdAction',
    async (id: number, { rejectWithValue }) => {
        try {
            const backendData = await getProfessionById(id);
            const mappedProfession = mapBackendProfessionDataToRedux(backendData);
            return { profession: mappedProfession };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении профессии');
        }
    }
);

// Получить навыки для профессии
export const getProfessionSkillsAction = createAsyncThunk(
    'profession/getProfessionSkillsAction',
    async (id: number, { rejectWithValue }) => {
        try {
            const backendData = await getProfessionSkills(id);
            console.log('backendSkillsData', backendData);
            const mappedSkills = mapBackendSkillsDataToRedux(backendData);
            console.log('mappedSkills', mappedSkills);
            return { skills: mappedSkills };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || 'Ошибка при получении навыков');
        }
    }
);
