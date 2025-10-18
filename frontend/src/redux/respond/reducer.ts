import { createReducer } from '@reduxjs/toolkit';
import { RespondState } from './types';
import { respondToVacancyAction } from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: RespondState = {
    respondToVacancy: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const respondReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(respondToVacancyAction.pending, (state) => {
            state.respondToVacancy.status = LoadStatus.IN_PROGRESS;
            state.respondToVacancy.error = null;
        })
        .addCase(respondToVacancyAction.fulfilled, (state) => {
            state.respondToVacancy.status = LoadStatus.SUCCESS;
            state.respondToVacancy.error = null;
        })
        .addCase(respondToVacancyAction.rejected, (state, action) => {
            state.respondToVacancy.status = LoadStatus.ERROR;
            state.respondToVacancy.error = action.payload || 'Ошибка при отклике на вакансию';
        });
});

export default respondReducer;

