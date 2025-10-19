import { Dispatch } from 'redux';
import {
  getTopProfessionsResume,
  getTopSkillsResume,
  getSalaryResume,
  getExperienceResume,
  getAverageCountResponds,
  getAverageMedianSalaryResponds,
  getRespondsStatusStats,
  getAverageAgeResponds,
  getRespondsTimeline,
} from '../../api/analytics';
import {
  AnalyticsActionTypes,
  FetchTopProfessionsRequestAction,
  FetchTopProfessionsSuccessAction,
  FetchTopProfessionsFailureAction,
  FetchTopSkillsRequestAction,
  FetchTopSkillsSuccessAction,
  FetchTopSkillsFailureAction,
  FetchSalaryDataRequestAction,
  FetchSalaryDataSuccessAction,
  FetchSalaryDataFailureAction,
  FetchExperienceDataRequestAction,
  FetchExperienceDataSuccessAction,
  FetchExperienceDataFailureAction,
  FetchAverageCountRespondsRequestAction,
  FetchAverageCountRespondsSuccessAction,
  FetchAverageCountRespondsFailureAction,
  FetchAverageMedianSalaryRespondsRequestAction,
  FetchAverageMedianSalaryRespondsSuccessAction,
  FetchAverageMedianSalaryRespondsFailureAction,
  FetchRespondsStatusStatsRequestAction,
  FetchRespondsStatusStatsSuccessAction,
  FetchRespondsStatusStatsFailureAction,
  FetchAverageAgeRespondsRequestAction,
  FetchAverageAgeRespondsSuccessAction,
  FetchAverageAgeRespondsFailureAction,
  FetchRespondsTimelineRequestAction,
  FetchRespondsTimelineSuccessAction,
  FetchRespondsTimelineFailureAction,
  ClearAnalyticsErrorsAction,
} from './types';

// Action creators для админа
export const fetchTopProfessionsRequest = (): FetchTopProfessionsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_REQUEST,
});

export const fetchTopProfessionsSuccess = (data: any[]): FetchTopProfessionsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_SUCCESS,
  payload: data,
});

export const fetchTopProfessionsFailure = (error: string): FetchTopProfessionsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_FAILURE,
  payload: error,
});

export const fetchTopSkillsRequest = (): FetchTopSkillsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_REQUEST,
});

export const fetchTopSkillsSuccess = (data: any[]): FetchTopSkillsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_SUCCESS,
  payload: data,
});

export const fetchTopSkillsFailure = (error: string): FetchTopSkillsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_FAILURE,
  payload: error,
});

export const fetchSalaryDataRequest = (): FetchSalaryDataRequestAction => ({
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_REQUEST,
});

export const fetchSalaryDataSuccess = (data: any): FetchSalaryDataSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_SUCCESS,
  payload: data,
});

export const fetchSalaryDataFailure = (error: string): FetchSalaryDataFailureAction => ({
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_FAILURE,
  payload: error,
});

export const fetchExperienceDataRequest = (): FetchExperienceDataRequestAction => ({
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_REQUEST,
});

export const fetchExperienceDataSuccess = (data: any): FetchExperienceDataSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_SUCCESS,
  payload: data,
});

export const fetchExperienceDataFailure = (error: string): FetchExperienceDataFailureAction => ({
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_FAILURE,
  payload: error,
});

// Action creators для компании
export const fetchAverageCountRespondsRequest = (): FetchAverageCountRespondsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_REQUEST,
});

export const fetchAverageCountRespondsSuccess = (data: number): FetchAverageCountRespondsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_SUCCESS,
  payload: data,
});

export const fetchAverageCountRespondsFailure = (error: string): FetchAverageCountRespondsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_FAILURE,
  payload: error,
});

export const fetchAverageMedianSalaryRespondsRequest = (): FetchAverageMedianSalaryRespondsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_REQUEST,
});

export const fetchAverageMedianSalaryRespondsSuccess = (data: any): FetchAverageMedianSalaryRespondsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_SUCCESS,
  payload: data,
});

export const fetchAverageMedianSalaryRespondsFailure = (error: string): FetchAverageMedianSalaryRespondsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_FAILURE,
  payload: error,
});

export const fetchRespondsStatusStatsRequest = (): FetchRespondsStatusStatsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_REQUEST,
});

export const fetchRespondsStatusStatsSuccess = (data: any[]): FetchRespondsStatusStatsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_SUCCESS,
  payload: data,
});

export const fetchRespondsStatusStatsFailure = (error: string): FetchRespondsStatusStatsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_FAILURE,
  payload: error,
});

export const fetchAverageAgeRespondsRequest = (): FetchAverageAgeRespondsRequestAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_REQUEST,
});

export const fetchAverageAgeRespondsSuccess = (data: number): FetchAverageAgeRespondsSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_SUCCESS,
  payload: data,
});

export const fetchAverageAgeRespondsFailure = (error: string): FetchAverageAgeRespondsFailureAction => ({
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_FAILURE,
  payload: error,
});

export const fetchRespondsTimelineRequest = (): FetchRespondsTimelineRequestAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_REQUEST,
});

export const fetchRespondsTimelineSuccess = (data: any[]): FetchRespondsTimelineSuccessAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_SUCCESS,
  payload: data,
});

export const fetchRespondsTimelineFailure = (error: string): FetchRespondsTimelineFailureAction => ({
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_FAILURE,
  payload: error,
});

export const clearAnalyticsErrors = (): ClearAnalyticsErrorsAction => ({
  type: AnalyticsActionTypes.CLEAR_ANALYTICS_ERRORS,
});

// Thunk actions для админа
export const fetchTopProfessionsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchTopProfessionsRequest());
  try {
    const data = await getTopProfessionsResume();
    dispatch(fetchTopProfessionsSuccess(data));
  } catch (error: any) {
    dispatch(fetchTopProfessionsFailure(error.message || 'Ошибка загрузки топ профессий'));
  }
};

export const fetchTopSkillsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchTopSkillsRequest());
  try {
    const data = await getTopSkillsResume();
    dispatch(fetchTopSkillsSuccess(data));
  } catch (error: any) {
    dispatch(fetchTopSkillsFailure(error.message || 'Ошибка загрузки топ навыков'));
  }
};

export const fetchSalaryDataAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchSalaryDataRequest());
  try {
    const data = await getSalaryResume();
    dispatch(fetchSalaryDataSuccess(data));
  } catch (error: any) {
    dispatch(fetchSalaryDataFailure(error.message || 'Ошибка загрузки данных о зарплатах'));
  }
};

export const fetchExperienceDataAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchExperienceDataRequest());
  try {
    const data = await getExperienceResume();
    dispatch(fetchExperienceDataSuccess(data));
  } catch (error: any) {
    dispatch(fetchExperienceDataFailure(error.message || 'Ошибка загрузки данных об опыте'));
  }
};

// Thunk actions для компании
export const fetchAverageCountRespondsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchAverageCountRespondsRequest());
  try {
    const data = await getAverageCountResponds();
    dispatch(fetchAverageCountRespondsSuccess(data));
  } catch (error: any) {
    dispatch(fetchAverageCountRespondsFailure(error.message || 'Ошибка загрузки среднего количества откликов'));
  }
};

export const fetchAverageMedianSalaryRespondsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchAverageMedianSalaryRespondsRequest());
  try {
    const data = await getAverageMedianSalaryResponds();
    dispatch(fetchAverageMedianSalaryRespondsSuccess(data));
  } catch (error: any) {
    dispatch(fetchAverageMedianSalaryRespondsFailure(error.message || 'Ошибка загрузки данных о зарплатах откликов'));
  }
};

export const fetchRespondsStatusStatsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchRespondsStatusStatsRequest());
  try {
    const data = await getRespondsStatusStats();
    dispatch(fetchRespondsStatusStatsSuccess(data));
  } catch (error: any) {
    dispatch(fetchRespondsStatusStatsFailure(error.message || 'Ошибка загрузки статистики статусов откликов'));
  }
};

export const fetchAverageAgeRespondsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchAverageAgeRespondsRequest());
  try {
    const data = await getAverageAgeResponds();
    dispatch(fetchAverageAgeRespondsSuccess(data));
  } catch (error: any) {
    dispatch(fetchAverageAgeRespondsFailure(error.message || 'Ошибка загрузки данных о возрасте откликов'));
  }
};

export const fetchRespondsTimelineAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchRespondsTimelineRequest());
  try {
    const data = await getRespondsTimeline();
    dispatch(fetchRespondsTimelineSuccess(data));
  } catch (error: any) {
    dispatch(fetchRespondsTimelineFailure(error.message || 'Ошибка загрузки временной линии откликов'));
  }
};
