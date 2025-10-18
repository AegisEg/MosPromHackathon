import { createReducer } from '@reduxjs/toolkit';
import { VacancyState } from './types';
import {
    getVacanciesAction,
    getVacancyByIdAction,
    createVacancyAction,
    updateVacancyAction,
    deleteVacancyAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: VacancyState = {
    vacancies: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
    currentVacancy: {
        status: LoadStatus.NOT_LOADING,
        data: null,
    },
    createVacancy: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    updateVacancy: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    deleteVacancy: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const vacancyReducer = createReducer(initialState, (builder) => {
    // getVacanciesAction
    builder
        .addCase(getVacanciesAction.pending, (state) => {
            state.vacancies.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getVacanciesAction.fulfilled, (state, action) => {
            state.vacancies.data = action.payload.vacancies;
            state.vacancies.status = LoadStatus.SUCCESS;
        })
        .addCase(getVacanciesAction.rejected, (state, action) => {
            state.vacancies.status = LoadStatus.ERROR;
        });

    // getVacancyByIdAction
    builder
        .addCase(getVacancyByIdAction.pending, (state) => {
            state.currentVacancy.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getVacancyByIdAction.fulfilled, (state, action) => {
            state.currentVacancy.data = action.payload.vacancy;
            state.currentVacancy.status = LoadStatus.SUCCESS;
        })
        .addCase(getVacancyByIdAction.rejected, (state, action) => {
            state.currentVacancy.status = LoadStatus.ERROR;
        });

    // createVacancyAction
    builder
        .addCase(createVacancyAction.pending, (state) => {
            state.createVacancy.status = LoadStatus.IN_PROGRESS;
            state.createVacancy.error = null;
        })
        .addCase(createVacancyAction.fulfilled, (state, action) => {
            state.vacancies.data.push(action.payload.vacancy);
            state.createVacancy.status = LoadStatus.SUCCESS;
            state.createVacancy.error = null;
        })
        .addCase(createVacancyAction.rejected, (state, action) => {
            state.createVacancy.status = LoadStatus.ERROR;
            state.createVacancy.error = action.payload as string;
        });

    // updateVacancyAction
    builder
        .addCase(updateVacancyAction.pending, (state) => {
            state.updateVacancy.status = LoadStatus.IN_PROGRESS;
            state.updateVacancy.error = null;
        })
        .addCase(updateVacancyAction.fulfilled, (state, action) => {
            const updatedVacancy = action.payload.vacancy;
            const index = state.vacancies.data.findIndex(vacancy => vacancy.id === updatedVacancy.id);
            if (index !== -1) {
                state.vacancies.data[index] = updatedVacancy;
            }
            if (state.currentVacancy.data?.id === updatedVacancy.id) {
                state.currentVacancy.data = updatedVacancy;
            }
            state.updateVacancy.status = LoadStatus.SUCCESS;
            state.updateVacancy.error = null;
        })
        .addCase(updateVacancyAction.rejected, (state, action) => {
            state.updateVacancy.status = LoadStatus.ERROR;
            state.updateVacancy.error = action.payload as string;
        });

    // deleteVacancyAction
    builder
        .addCase(deleteVacancyAction.pending, (state) => {
            state.deleteVacancy.status = LoadStatus.IN_PROGRESS;
            state.deleteVacancy.error = null;
        })
        .addCase(deleteVacancyAction.fulfilled, (state, action) => {
            const deletedId = action.payload.id;
            state.vacancies.data = state.vacancies.data.filter(vacancy => vacancy.id !== deletedId);
            if (state.currentVacancy.data?.id === deletedId) {
                state.currentVacancy.data = null;
            }
            state.deleteVacancy.status = LoadStatus.SUCCESS;
            state.deleteVacancy.error = null;
        })
        .addCase(deleteVacancyAction.rejected, (state, action) => {
            state.deleteVacancy.status = LoadStatus.ERROR;
            state.deleteVacancy.error = action.payload as string;
        });
});

export default vacancyReducer;
