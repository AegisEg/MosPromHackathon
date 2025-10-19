import { createReducer } from '@reduxjs/toolkit';
import { RespondsState } from './types';
import {
    getRespondsByVacancyAction,
    updateRespondStatusAction,
    getBestMatchesAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: RespondsState = {
    responds: {},
    bestMatches: {},
    updateStatus: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const respondsReducer = createReducer(initialState, (builder) => {
    // getRespondsByVacancyAction
    builder
        .addCase(getRespondsByVacancyAction.pending, (state, action) => {
            const vacancyId = action.meta.arg;
            state.responds[vacancyId] = {
                status: LoadStatus.IN_PROGRESS,
                data: [],
                error: null,
            };
        })
        .addCase(getRespondsByVacancyAction.fulfilled, (state, action) => {
            const { vacancyId, responds } = action.payload;
            state.responds[vacancyId] = {
                status: LoadStatus.SUCCESS,
                data: responds,
                error: null,
            };
        })
        .addCase(getRespondsByVacancyAction.rejected, (state, action) => {
            const vacancyId = action.meta.arg;
            state.responds[vacancyId] = {
                status: LoadStatus.ERROR,
                data: [],
                error: action.payload as string,
            };
        });

    // updateRespondStatusAction
    builder
        .addCase(updateRespondStatusAction.pending, (state) => {
            state.updateStatus.status = LoadStatus.IN_PROGRESS;
            state.updateStatus.error = null;
        })
        .addCase(updateRespondStatusAction.fulfilled, (state, action) => {
            const { respondId, status } = action.payload;
            
            // Обновляем статус отклика во всех вакансиях
            Object.keys(state.responds).forEach(vacancyId => {
                const vacancyResponds = state.responds[parseInt(vacancyId)];
                if (vacancyResponds.data) {
                    const respondIndex = vacancyResponds.data.findIndex(respond => respond.id === respondId);
                    if (respondIndex !== -1) {
                        vacancyResponds.data[respondIndex].respondStatus = status;
                    }
                }
            });
            
            state.updateStatus.status = LoadStatus.SUCCESS;
            state.updateStatus.error = null;
        })
        .addCase(updateRespondStatusAction.rejected, (state, action) => {
            state.updateStatus.status = LoadStatus.ERROR;
            state.updateStatus.error = action.payload as string;
        });

    // getBestMatchesAction
    builder
        .addCase(getBestMatchesAction.pending, (state, action) => {
            const vacancyId = action.meta.arg;
            state.bestMatches[vacancyId] = {
                status: LoadStatus.IN_PROGRESS,
                data: [],
                error: null,
            };
        })
        .addCase(getBestMatchesAction.fulfilled, (state, action) => {
            const { vacancyId, bestMatches } = action.payload;
            state.bestMatches[vacancyId] = {
                status: LoadStatus.SUCCESS,
                data: bestMatches,
                error: null,
            };
        })
        .addCase(getBestMatchesAction.rejected, (state, action) => {
            const vacancyId = action.meta.arg;
            state.bestMatches[vacancyId] = {
                status: LoadStatus.ERROR,
                data: [],
                error: action.payload as string,
            };
        });
});

export default respondsReducer;
