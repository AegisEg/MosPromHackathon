import { RootState } from '../store';

export const selectProfessions = (state: RootState) => state.profession.professions;
export const selectCurrentProfessionSkills = (state: RootState) => state.profession.currentProfessionSkills;

// Селекторы для удобства
export const selectProfessionsData = (state: RootState) => state.profession.professions.data;
export const selectProfessionsStatus = (state: RootState) => state.profession.professions.status;
export const selectCurrentProfessionSkillsData = (state: RootState) => state.profession.currentProfessionSkills.data;
export const selectCurrentProfessionSkillsStatus = (state: RootState) => state.profession.currentProfessionSkills.status;
