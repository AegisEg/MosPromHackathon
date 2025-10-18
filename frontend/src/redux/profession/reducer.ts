import { createReducer } from '@reduxjs/toolkit';
import { ProfessionState } from './types';
import {
    getProfessionsAction,
    getProfessionByIdAction,
    getProfessionSkillsAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: ProfessionState = {
    professions: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
    currentProfessionSkills: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
};

const professionReducer = createReducer(initialState, (builder) => {
    // getProfessionsAction
    builder
        .addCase(getProfessionsAction.pending, (state) => {
            state.professions.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getProfessionsAction.fulfilled, (state, action) => {
            state.professions.data = action.payload.professions;
            state.professions.status = LoadStatus.SUCCESS;
        })
        .addCase(getProfessionsAction.rejected, (state, action) => {
            state.professions.status = LoadStatus.ERROR;
        });

    // getProfessionByIdAction
    builder
        .addCase(getProfessionByIdAction.pending, (state) => {
            // Можно добавить состояние для текущей профессии если нужно
        })
        .addCase(getProfessionByIdAction.fulfilled, (state, action) => {
            // Можно сохранить текущую профессию если нужно
        })
        .addCase(getProfessionByIdAction.rejected, (state, action) => {
            // Обработка ошибки
        });

    // getProfessionSkillsAction
    builder
        .addCase(getProfessionSkillsAction.pending, (state) => {
            state.currentProfessionSkills.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getProfessionSkillsAction.fulfilled, (state, action) => {
            state.currentProfessionSkills.data = action.payload.skills;
            state.currentProfessionSkills.status = LoadStatus.SUCCESS;
        })
        .addCase(getProfessionSkillsAction.rejected, (state, action) => {
            state.currentProfessionSkills.status = LoadStatus.ERROR;
        });
});

export default professionReducer;
