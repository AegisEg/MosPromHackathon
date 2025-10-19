import { 
  TopProfession, 
  TopSkill, 
  SalaryData, 
  ExperienceData, 
  RespondStats, 
  AgeData, 
  TimelineData 
} from '../../api/analytics';

// Состояние аналитики
export interface AnalyticsState {
  // Данные для админа
  topProfessions: TopProfession[];
  topSkills: TopSkill[];
  salaryData: SalaryData | null;
  experienceData: ExperienceData | null;
  
  // Данные для компании
  averageCountResponds: number | null;
  averageMedianSalaryResponds: SalaryData | null;
  respondsStatusStats: RespondStats[] | null;
  averageAgeResponds: number | null;
  respondsTimeline: TimelineData[];
  
  // Состояния загрузки
  loading: {
    topProfessions: boolean;
    topSkills: boolean;
    salaryData: boolean;
    experienceData: boolean;
    averageCountResponds: boolean;
    averageMedianSalaryResponds: boolean;
    respondsStatusStats: boolean;
    averageAgeResponds: boolean;
    respondsTimeline: boolean;
  };
  
  // Ошибки
  errors: {
    topProfessions: string | null;
    topSkills: string | null;
    salaryData: string | null;
    experienceData: string | null;
    averageCountResponds: string | null;
    averageMedianSalaryResponds: string | null;
    respondsStatusStats: string | null;
    averageAgeResponds: string | null;
    respondsTimeline: string | null;
  };
}

// Action типы
export enum AnalyticsActionTypes {
  // Загрузка данных для админа
  FETCH_TOP_PROFESSIONS_REQUEST = 'FETCH_TOP_PROFESSIONS_REQUEST',
  FETCH_TOP_PROFESSIONS_SUCCESS = 'FETCH_TOP_PROFESSIONS_SUCCESS',
  FETCH_TOP_PROFESSIONS_FAILURE = 'FETCH_TOP_PROFESSIONS_FAILURE',
  
  FETCH_TOP_SKILLS_REQUEST = 'FETCH_TOP_SKILLS_REQUEST',
  FETCH_TOP_SKILLS_SUCCESS = 'FETCH_TOP_SKILLS_SUCCESS',
  FETCH_TOP_SKILLS_FAILURE = 'FETCH_TOP_SKILLS_FAILURE',
  
  FETCH_SALARY_DATA_REQUEST = 'FETCH_SALARY_DATA_REQUEST',
  FETCH_SALARY_DATA_SUCCESS = 'FETCH_SALARY_DATA_SUCCESS',
  FETCH_SALARY_DATA_FAILURE = 'FETCH_SALARY_DATA_FAILURE',
  
  FETCH_EXPERIENCE_DATA_REQUEST = 'FETCH_EXPERIENCE_DATA_REQUEST',
  FETCH_EXPERIENCE_DATA_SUCCESS = 'FETCH_EXPERIENCE_DATA_SUCCESS',
  FETCH_EXPERIENCE_DATA_FAILURE = 'FETCH_EXPERIENCE_DATA_FAILURE',
  
  // Загрузка данных для компании
  FETCH_AVERAGE_COUNT_RESPONDS_REQUEST = 'FETCH_AVERAGE_COUNT_RESPONDS_REQUEST',
  FETCH_AVERAGE_COUNT_RESPONDS_SUCCESS = 'FETCH_AVERAGE_COUNT_RESPONDS_SUCCESS',
  FETCH_AVERAGE_COUNT_RESPONDS_FAILURE = 'FETCH_AVERAGE_COUNT_RESPONDS_FAILURE',
  
  FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_REQUEST = 'FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_REQUEST',
  FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_SUCCESS = 'FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_SUCCESS',
  FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_FAILURE = 'FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_FAILURE',
  
  FETCH_RESPONDS_STATUS_STATS_REQUEST = 'FETCH_RESPONDS_STATUS_STATS_REQUEST',
  FETCH_RESPONDS_STATUS_STATS_SUCCESS = 'FETCH_RESPONDS_STATUS_STATS_SUCCESS',
  FETCH_RESPONDS_STATUS_STATS_FAILURE = 'FETCH_RESPONDS_STATUS_STATS_FAILURE',
  
  FETCH_AVERAGE_AGE_RESPONDS_REQUEST = 'FETCH_AVERAGE_AGE_RESPONDS_REQUEST',
  FETCH_AVERAGE_AGE_RESPONDS_SUCCESS = 'FETCH_AVERAGE_AGE_RESPONDS_SUCCESS',
  FETCH_AVERAGE_AGE_RESPONDS_FAILURE = 'FETCH_AVERAGE_AGE_RESPONDS_FAILURE',
  
  FETCH_RESPONDS_TIMELINE_REQUEST = 'FETCH_RESPONDS_TIMELINE_REQUEST',
  FETCH_RESPONDS_TIMELINE_SUCCESS = 'FETCH_RESPONDS_TIMELINE_SUCCESS',
  FETCH_RESPONDS_TIMELINE_FAILURE = 'FETCH_RESPONDS_TIMELINE_FAILURE',
  
  // Очистка ошибок
  CLEAR_ANALYTICS_ERRORS = 'CLEAR_ANALYTICS_ERRORS',
}

// Action creators
export interface FetchTopProfessionsRequestAction {
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_REQUEST;
  [key: string]: any;
}

export interface FetchTopProfessionsSuccessAction {
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_SUCCESS;
  payload: TopProfession[];
  [key: string]: any;
}

export interface FetchTopProfessionsFailureAction {
  type: AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchTopSkillsRequestAction {
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_REQUEST;
  [key: string]: any;
}

export interface FetchTopSkillsSuccessAction {
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_SUCCESS;
  payload: TopSkill[];
  [key: string]: any;
}

export interface FetchTopSkillsFailureAction {
  type: AnalyticsActionTypes.FETCH_TOP_SKILLS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchSalaryDataRequestAction {
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_REQUEST;
  [key: string]: any;
}

export interface FetchSalaryDataSuccessAction {
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_SUCCESS;
  payload: SalaryData;
  [key: string]: any;
}

export interface FetchSalaryDataFailureAction {
  type: AnalyticsActionTypes.FETCH_SALARY_DATA_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchExperienceDataRequestAction {
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_REQUEST;
  [key: string]: any;
}

export interface FetchExperienceDataSuccessAction {
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_SUCCESS;
  payload: ExperienceData;
  [key: string]: any;
}

export interface FetchExperienceDataFailureAction {
  type: AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchAverageCountRespondsRequestAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_REQUEST;
  [key: string]: any;
}

export interface FetchAverageCountRespondsSuccessAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_SUCCESS;
  payload: number;
  [key: string]: any;
}

export interface FetchAverageCountRespondsFailureAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchAverageMedianSalaryRespondsRequestAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_REQUEST;
  [key: string]: any;
}

export interface FetchAverageMedianSalaryRespondsSuccessAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_SUCCESS;
  payload: SalaryData;
  [key: string]: any;
}

export interface FetchAverageMedianSalaryRespondsFailureAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchRespondsStatusStatsRequestAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_REQUEST;
  [key: string]: any;
}

export interface FetchRespondsStatusStatsSuccessAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_SUCCESS;
  payload: RespondStats[];
  [key: string]: any;
}

export interface FetchRespondsStatusStatsFailureAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchAverageAgeRespondsRequestAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_REQUEST;
  [key: string]: any;
}

export interface FetchAverageAgeRespondsSuccessAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_SUCCESS;
  payload: number;
  [key: string]: any;
}

export interface FetchAverageAgeRespondsFailureAction {
  type: AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface FetchRespondsTimelineRequestAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_REQUEST;
  [key: string]: any;
}

export interface FetchRespondsTimelineSuccessAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_SUCCESS;
  payload: TimelineData[];
  [key: string]: any;
}

export interface FetchRespondsTimelineFailureAction {
  type: AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_FAILURE;
  payload: string;
  [key: string]: any;
}

export interface ClearAnalyticsErrorsAction {
  type: AnalyticsActionTypes.CLEAR_ANALYTICS_ERRORS;
  [key: string]: any;
}

export type AnalyticsAction =
  | FetchTopProfessionsRequestAction
  | FetchTopProfessionsSuccessAction
  | FetchTopProfessionsFailureAction
  | FetchTopSkillsRequestAction
  | FetchTopSkillsSuccessAction
  | FetchTopSkillsFailureAction
  | FetchSalaryDataRequestAction
  | FetchSalaryDataSuccessAction
  | FetchSalaryDataFailureAction
  | FetchExperienceDataRequestAction
  | FetchExperienceDataSuccessAction
  | FetchExperienceDataFailureAction
  | FetchAverageCountRespondsRequestAction
  | FetchAverageCountRespondsSuccessAction
  | FetchAverageCountRespondsFailureAction
  | FetchAverageMedianSalaryRespondsRequestAction
  | FetchAverageMedianSalaryRespondsSuccessAction
  | FetchAverageMedianSalaryRespondsFailureAction
  | FetchRespondsStatusStatsRequestAction
  | FetchRespondsStatusStatsSuccessAction
  | FetchRespondsStatusStatsFailureAction
  | FetchAverageAgeRespondsRequestAction
  | FetchAverageAgeRespondsSuccessAction
  | FetchAverageAgeRespondsFailureAction
  | FetchRespondsTimelineRequestAction
  | FetchRespondsTimelineSuccessAction
  | FetchRespondsTimelineFailureAction
  | ClearAnalyticsErrorsAction;
