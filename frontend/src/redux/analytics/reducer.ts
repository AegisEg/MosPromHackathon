import { AnalyticsState, AnalyticsAction, AnalyticsActionTypes } from './types';

// Функция для нормализации дат
const normalizeDate = (dateString: string): string => {
  try {
    // Если дата уже в формате YYYY-MM-DD, возвращаем как есть
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Если дата в формате DD.MM.YYYY, конвертируем в YYYY-MM-DD
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('.');
      return `${year}-${month}-${day}`;
    }
    
    // Если дата в формате DD/MM/YYYY, конвертируем в YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    
    // Пытаемся распарсить дату и вернуть в формате YYYY-MM-DD
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    
    // Если ничего не подошло, возвращаем исходную строку
    return dateString;
  } catch (error) {
    console.warn('Error normalizing date:', dateString, error);
    return dateString;
  }
};

const initialState: AnalyticsState = {
  // Данные для админа
  topProfessions: [],
  topSkills: [],
  salaryData: null,
  experienceData: null,
  
  // Данные для компании
  averageCountResponds: null,
  averageMedianSalaryResponds: null,
  respondsStatusStats: null,
  averageAgeResponds: null,
  respondsTimeline: [],
  
  // Состояния загрузки
  loading: {
    topProfessions: false,
    topSkills: false,
    salaryData: false,
    experienceData: false,
    averageCountResponds: false,
    averageMedianSalaryResponds: false,
    respondsStatusStats: false,
    averageAgeResponds: false,
    respondsTimeline: false,
  },
  
  // Ошибки
  errors: {
    topProfessions: null,
    topSkills: null,
    salaryData: null,
    experienceData: null,
    averageCountResponds: null,
    averageMedianSalaryResponds: null,
    respondsStatusStats: null,
    averageAgeResponds: null,
    respondsTimeline: null,
  },
};

const analyticsReducer = (state = initialState, action: AnalyticsAction): AnalyticsState => {
  switch (action.type) {
    // Топ профессии
    case AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          topProfessions: true,
        },
        errors: {
          ...state.errors,
          topProfessions: null,
        },
      };
    case AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_SUCCESS:
      return {
        ...state,
        topProfessions: action.payload,
        loading: {
          ...state.loading,
          topProfessions: false,
        },
      };
    case AnalyticsActionTypes.FETCH_TOP_PROFESSIONS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          topProfessions: false,
        },
        errors: {
          ...state.errors,
          topProfessions: action.payload,
        },
      };

    // Топ навыки
    case AnalyticsActionTypes.FETCH_TOP_SKILLS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          topSkills: true,
        },
        errors: {
          ...state.errors,
          topSkills: null,
        },
      };
    case AnalyticsActionTypes.FETCH_TOP_SKILLS_SUCCESS:
      return {
        ...state,
        topSkills: action.payload,
        loading: {
          ...state.loading,
          topSkills: false,
        },
      };
    case AnalyticsActionTypes.FETCH_TOP_SKILLS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          topSkills: false,
        },
        errors: {
          ...state.errors,
          topSkills: action.payload,
        },
      };

    // Данные о зарплатах
    case AnalyticsActionTypes.FETCH_SALARY_DATA_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          salaryData: true,
        },
        errors: {
          ...state.errors,
          salaryData: null,
        },
      };
    case AnalyticsActionTypes.FETCH_SALARY_DATA_SUCCESS:
      return {
        ...state,
        salaryData: action.payload,
        loading: {
          ...state.loading,
          salaryData: false,
        },
      };
    case AnalyticsActionTypes.FETCH_SALARY_DATA_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          salaryData: false,
        },
        errors: {
          ...state.errors,
          salaryData: action.payload,
        },
      };

    // Данные об опыте
    case AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          experienceData: true,
        },
        errors: {
          ...state.errors,
          experienceData: null,
        },
      };
    case AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_SUCCESS:
      return {
        ...state,
        experienceData: action.payload,
        loading: {
          ...state.loading,
          experienceData: false,
        },
      };
    case AnalyticsActionTypes.FETCH_EXPERIENCE_DATA_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          experienceData: false,
        },
        errors: {
          ...state.errors,
          experienceData: action.payload,
        },
      };

    // Среднее количество откликов
    case AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageCountResponds: true,
        },
        errors: {
          ...state.errors,
          averageCountResponds: null,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_SUCCESS:
      return {
        ...state,
        averageCountResponds: action.payload,
        loading: {
          ...state.loading,
          averageCountResponds: false,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_COUNT_RESPONDS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageCountResponds: false,
        },
        errors: {
          ...state.errors,
          averageCountResponds: action.payload,
        },
      };

    // Средняя и медианная зарплата откликов
    case AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageMedianSalaryResponds: true,
        },
        errors: {
          ...state.errors,
          averageMedianSalaryResponds: null,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_SUCCESS:
      return {
        ...state,
        averageMedianSalaryResponds: action.payload,
        loading: {
          ...state.loading,
          averageMedianSalaryResponds: false,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_MEDIAN_SALARY_RESPONDS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageMedianSalaryResponds: false,
        },
        errors: {
          ...state.errors,
          averageMedianSalaryResponds: action.payload,
        },
      };

    // Статистика статусов откликов
    case AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          respondsStatusStats: true,
        },
        errors: {
          ...state.errors,
          respondsStatusStats: null,
        },
      };
    case AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_SUCCESS:
      return {
        ...state,
        respondsStatusStats: action.payload,
        loading: {
          ...state.loading,
          respondsStatusStats: false,
        },
      };
    case AnalyticsActionTypes.FETCH_RESPONDS_STATUS_STATS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          respondsStatusStats: false,
        },
        errors: {
          ...state.errors,
          respondsStatusStats: action.payload,
        },
      };

    // Средний возраст откликов
    case AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageAgeResponds: true,
        },
        errors: {
          ...state.errors,
          averageAgeResponds: null,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_SUCCESS:
      return {
        ...state,
        averageAgeResponds: action.payload,
        loading: {
          ...state.loading,
          averageAgeResponds: false,
        },
      };
    case AnalyticsActionTypes.FETCH_AVERAGE_AGE_RESPONDS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          averageAgeResponds: false,
        },
        errors: {
          ...state.errors,
          averageAgeResponds: action.payload,
        },
      };

    // Временная линия откликов
    case AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          respondsTimeline: true,
        },
        errors: {
          ...state.errors,
          respondsTimeline: null,
        },
      };
    case AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_SUCCESS:
      return {
        ...state,
        respondsTimeline: action.payload.map((item: any) => ({
          ...item,
          date: normalizeDate(item.date)
        })),
        loading: {
          ...state.loading,
          respondsTimeline: false,
        },
      };
    case AnalyticsActionTypes.FETCH_RESPONDS_TIMELINE_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          respondsTimeline: false,
        },
        errors: {
          ...state.errors,
          respondsTimeline: action.payload,
        },
      };

    // Очистка ошибок
    case AnalyticsActionTypes.CLEAR_ANALYTICS_ERRORS:
      return {
        ...state,
        errors: {
          topProfessions: null,
          topSkills: null,
          salaryData: null,
          experienceData: null,
          averageCountResponds: null,
          averageMedianSalaryResponds: null,
          respondsStatusStats: null,
          averageAgeResponds: null,
          respondsTimeline: null,
        },
      };

    default:
      return state;
  }
};

export default analyticsReducer;