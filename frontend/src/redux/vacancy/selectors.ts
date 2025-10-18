import { RootState } from '../store';

export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectCurrentVacancy = (state: RootState) => state.vacancy.currentVacancy;
export const selectCreateVacancy = (state: RootState) => state.vacancy.createVacancy;
export const selectUpdateVacancy = (state: RootState) => state.vacancy.updateVacancy;
export const selectDeleteVacancy = (state: RootState) => state.vacancy.deleteVacancy;

// Селекторы для удобства
export const selectVacanciesData = (state: RootState) => state.vacancy.vacancies.data;
export const selectVacanciesStatus = (state: RootState) => state.vacancy.vacancies.status;
export const selectCurrentVacancyData = (state: RootState) => state.vacancy.currentVacancy.data;
export const selectCurrentVacancyStatus = (state: RootState) => state.vacancy.currentVacancy.status;
