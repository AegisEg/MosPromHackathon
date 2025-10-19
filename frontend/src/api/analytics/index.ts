import api from '../index';

// Типы для аналитики (соответствуют бэкенду)
export interface TopProfession {
  professionId: number;
  professionName: string;
  resumesCount: number;
  [key: string]: any;
}

export interface TopSkill {
  skillId: number;
  skillName: string;
  vacanciesCount: number;
  [key: string]: any;
}

export interface SalaryData {
  averageSalary: number;
  medianSalary: number;
  min?: number;
  max?: number;
  [key: string]: any;
}

export interface ExperienceData {
  averageExperience: number;
  medianExperience: number;
  [key: string]: any;
}

export interface RespondStats {
  status: number;
  count: number;
  [key: string]: any;
}

export interface AgeData {
  age_group: string;
  count: number;
  [key: string]: any;
}

export interface TimelineData {
  date: string;
  count: number;
  [key: string]: any;
}

// Типы для ответов API компании
export interface AverageCountRespondsResponse {
  averageResponds: number;
}

export interface AverageAgeRespondsResponse {
  averageAge: number;
}

// API для админа
export const getTopProfessionsResume = (): Promise<TopProfession[]> => {
  return api
    .post('analitics/top-professions-resume')
    .then((response) => {
      console.log('Top professions response:', response.data);
      return response.data.data || [];
    })
    .catch((error) => {
      console.error('Get top professions error:', error);
      throw error;
    });
};

export const getTopSkillsResume = (): Promise<TopSkill[]> => {
  return api
    .post('analitics/top-skills-resume')
    .then((response) => {
      console.log('Top skills response:', response.data);
      return response.data.data || [];
    })
    .catch((error) => {
      console.error('Get top skills error:', error);
      throw error;
    });
};

export const getSalaryResume = (): Promise<SalaryData> => {
  return api
    .post('analitics/salary-resume')
    .then((response) => {
      console.log('Salary data response:', response.data);
      return response.data.data || { average: 0, median: 0, min: 0, max: 0 };
    })
    .catch((error) => {
      console.error('Get salary data error:', error);
      throw error;
    });
};

export const getExperienceResume = (): Promise<ExperienceData[]> => {
  return api
    .post('analitics/experience-resume')
    .then((response) => {
      console.log('Experience data response:', response.data);
      return response.data.data || [];
    })
    .catch((error) => {
      console.error('Get experience data error:', error);
      throw error;
    });
};

// API для компании
export const getAverageCountResponds = (): Promise<number> => {
  return api
    .get('analitics/avarage-count-responds')
    .then((response) => {
      console.log('Average count responds response:', response.data);
      return response.data.data?.averageResponds || 0;
    })
    .catch((error) => {
      console.error('Get average count responds error:', error);
      throw error;
    });
};

export const getAverageMedianSalaryResponds = (): Promise<SalaryData> => {
  return api
    .get('analitics/average-median-salary-responds')
    .then((response) => {
      console.log('Average median salary responds response:', response.data);
      return response.data.data || { averageSalary: 0, medianSalary: 0, min: 0, max: 0 };
    })
    .catch((error) => {
      console.error('Get average median salary responds error:', error);
      throw error;
    });
};

export const getRespondsStatusStats = (): Promise<RespondStats[]> => {
  return api
    .get('analitics/responds-status-stats')
    .then((response) => {
      console.log('Responds status stats response:', response.data);
      return response.data.data || [];
    })
    .catch((error) => {
      console.error('Get responds status stats error:', error);
      throw error;
    });
};

export const getAverageAgeResponds = (): Promise<number> => {
  return api
    .get('analitics/average-age-responds')
    .then((response) => {
      console.log('Average age responds response:', response.data);
      return response.data.data?.averageAge || 0;
    })
    .catch((error) => {
      console.error('Get average age responds error:', error);
      throw error;
    });
};

export const getRespondsTimeline = (): Promise<TimelineData[]> => {
  return api
    .get('analitics/responds-timeline')
    .then((response) => {
      console.log('Responds timeline response:', response.data);
      return response.data.data || [];
    })
    .catch((error) => {
      console.error('Get responds timeline error:', error);
      throw error;
    });
};
