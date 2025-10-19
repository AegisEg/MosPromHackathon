import { RootState } from '../store';

// Селекторы для откликов
export const selectRespondsByVacancy = (state: RootState, vacancyId: number) => 
    state.responds.responds[vacancyId] || { status: 'NOT_LOADING' as const, data: [], error: null };

export const selectRespondsData = (state: RootState, vacancyId: number) => 
    state.responds.responds[vacancyId]?.data || [];

export const selectRespondsStatus = (state: RootState, vacancyId: number) => 
    state.responds.responds[vacancyId]?.status || 'NOT_LOADING' as const;

export const selectRespondsError = (state: RootState, vacancyId: number) => 
    state.responds.responds[vacancyId]?.error || null;

export const selectUpdateStatusStatus = (state: RootState) => 
    state.responds.updateStatus.status;

export const selectUpdateStatusError = (state: RootState) => 
    state.responds.updateStatus.error;

// Селекторы для лучших совпадений
export const selectBestMatchesByVacancy = (state: RootState, vacancyId: number) => 
    state.responds.bestMatches[vacancyId] || { status: 'NOT_LOADING' as const, data: [], error: null };

export const selectBestMatchesData = (state: RootState, vacancyId: number) => 
    state.responds.bestMatches[vacancyId]?.data || [];

export const selectBestMatchesStatus = (state: RootState, vacancyId: number) => 
    state.responds.bestMatches[vacancyId]?.status || 'NOT_LOADING' as const;

export const selectBestMatchesError = (state: RootState, vacancyId: number) => 
    state.responds.bestMatches[vacancyId]?.error || null;

// Селекторы для AI совпадений
export const selectAIMatchesByVacancy = (state: RootState, vacancyId: number) => 
    state.responds.aiMatches[vacancyId] || { status: 'NOT_LOADING' as const, data: [], error: null };

export const selectAIMatchesData = (state: RootState, vacancyId: number) => 
    state.responds.aiMatches[vacancyId]?.data || [];

export const selectAIMatchesStatus = (state: RootState, vacancyId: number) => 
    state.responds.aiMatches[vacancyId]?.status || 'NOT_LOADING' as const;

export const selectAIMatchesError = (state: RootState, vacancyId: number) => 
    state.responds.aiMatches[vacancyId]?.error || null;
