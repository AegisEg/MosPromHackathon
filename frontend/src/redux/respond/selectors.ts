import { RootState } from '../store';

export const selectRespondToVacancyStatus = (state: RootState) => state.respond.respondToVacancy.status;
export const selectRespondToVacancyError = (state: RootState) => state.respond.respondToVacancy.error;

