import { RootState } from '../store';

export const selectCurrentResumeData = (state: RootState) => state.resume.currentResume.data;
export const selectCurrentResumeStatus = (state: RootState) => state.resume.currentResume.status;

export const selectResumesData = (state: RootState) => state.resume.resumes.data;
export const selectResumesStatus = (state: RootState) => state.resume.resumes.status;
export const selectFirstResumeData = (state: RootState) => state.resume.resumes.data[0] || null;

export const selectCreateResumeStatus = (state: RootState) => state.resume.createResume.status;
export const selectCreateResumeError = (state: RootState) => state.resume.createResume.error;

export const selectUpdateResumeStatus = (state: RootState) => state.resume.updateResume.status;
export const selectUpdateResumeError = (state: RootState) => state.resume.updateResume.error;

export const selectDeleteResumeStatus = (state: RootState) => state.resume.deleteResume.status;
export const selectDeleteResumeError = (state: RootState) => state.resume.deleteResume.error;
