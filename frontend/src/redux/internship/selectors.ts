import { RootState } from '../store';

export const selectInternships = (state: RootState) => state.internship.internships;
export const selectCurrentInternship = (state: RootState) => state.internship.currentInternship;
export const selectCreateInternship = (state: RootState) => state.internship.createInternship;
export const selectUpdateInternship = (state: RootState) => state.internship.updateInternship;
export const selectDeleteInternship = (state: RootState) => state.internship.deleteInternship;

// Селекторы для удобства
export const selectInternshipsData = (state: RootState) => state.internship.internships.data;
export const selectInternshipsStatus = (state: RootState) => state.internship.internships.status;
export const selectCurrentInternshipData = (state: RootState) => state.internship.currentInternship.data;
export const selectCurrentInternshipStatus = (state: RootState) => state.internship.currentInternship.status;

