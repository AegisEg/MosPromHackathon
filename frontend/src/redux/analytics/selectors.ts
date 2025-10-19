import { RootState } from '../store';

export const selectAnalytics = (state: RootState) => state.analytics;

// Селекторы для данных админа
export const selectTopProfessions = (state: RootState) => state.analytics.topProfessions;
export const selectTopSkills = (state: RootState) => state.analytics.topSkills;
export const selectSalaryData = (state: RootState) => state.analytics.salaryData;
export const selectExperienceData = (state: RootState) => state.analytics.experienceData;

// Селекторы для данных компании
export const selectAverageCountResponds = (state: RootState) => state.analytics.averageCountResponds;
export const selectAverageMedianSalaryResponds = (state: RootState) => state.analytics.averageMedianSalaryResponds;
export const selectRespondsStatusStats = (state: RootState) => state.analytics.respondsStatusStats;
export const selectAverageAgeResponds = (state: RootState) => state.analytics.averageAgeResponds;
export const selectRespondsTimeline = (state: RootState) => state.analytics.respondsTimeline;

// Селекторы для состояний загрузки
export const selectAnalyticsLoading = (state: RootState) => state.analytics.loading;
export const selectTopProfessionsLoading = (state: RootState) => state.analytics.loading.topProfessions;
export const selectTopSkillsLoading = (state: RootState) => state.analytics.loading.topSkills;
export const selectSalaryDataLoading = (state: RootState) => state.analytics.loading.salaryData;
export const selectExperienceDataLoading = (state: RootState) => state.analytics.loading.experienceData;
export const selectAverageCountRespondsLoading = (state: RootState) => state.analytics.loading.averageCountResponds;
export const selectAverageMedianSalaryRespondsLoading = (state: RootState) => state.analytics.loading.averageMedianSalaryResponds;
export const selectRespondsStatusStatsLoading = (state: RootState) => state.analytics.loading.respondsStatusStats;
export const selectAverageAgeRespondsLoading = (state: RootState) => state.analytics.loading.averageAgeResponds;
export const selectRespondsTimelineLoading = (state: RootState) => state.analytics.loading.respondsTimeline;

// Селекторы для ошибок
export const selectAnalyticsErrors = (state: RootState) => state.analytics.errors;
export const selectTopProfessionsError = (state: RootState) => state.analytics.errors.topProfessions;
export const selectTopSkillsError = (state: RootState) => state.analytics.errors.topSkills;
export const selectSalaryDataError = (state: RootState) => state.analytics.errors.salaryData;
export const selectExperienceDataError = (state: RootState) => state.analytics.errors.experienceData;
export const selectAverageCountRespondsError = (state: RootState) => state.analytics.errors.averageCountResponds;
export const selectAverageMedianSalaryRespondsError = (state: RootState) => state.analytics.errors.averageMedianSalaryResponds;
export const selectRespondsStatusStatsError = (state: RootState) => state.analytics.errors.respondsStatusStats;
export const selectAverageAgeRespondsError = (state: RootState) => state.analytics.errors.averageAgeResponds;
export const selectRespondsTimelineError = (state: RootState) => state.analytics.errors.respondsTimeline;
