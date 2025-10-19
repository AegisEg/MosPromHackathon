import api from "..";

// Интерфейс для отклика (соответствует структуре из бэкенда)
export interface RespondData {
    id: number;
    profession: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    country?: string;
    city?: string;
    about?: string;
    salary?: number;
    status: boolean;
    education: EducationData[];
    experience_time: number;
    experiences: ExperienceData[];
    skills: SkillData[];
    respondStatus?: string; // Добавим это поле для фронтенда
    message?: string;
    createdAt?: string;
}

export interface EducationData {
    id: number;
    institution_name: string;
    degree: string;
    specialization: string;
    start_date: string;
    end_date?: string;
}

export interface ExperienceData {
    id: number;
    company_name: string;
    position: string;
    description?: string;
    start_date: string;
    end_date?: string;
}

export interface SkillData {
    id: number;
    name: string;
}

// Интерфейс для ответа API
export interface RespondsResponse {
    total: number;
    resumes: RespondData[];
}

// Получить отклики на вакансию
export const getRespondsByVacancy = (vacancyId: number): Promise<RespondsResponse> => {
    return api
        .get(`responds/show/${vacancyId}`)
        .then((response) => {
            console.log('API response:', response.data);
            return response.data.data.responds || { total: 0, resumes: [] };
        })
        .catch((error) => {
            console.error('Get responds error:', error);
            throw error;
        });
};

// Обновить статус отклика
export const updateRespondStatus = (respondId: number, status: string): Promise<void> => {
    return api
        .patch(`responds/${respondId}/updateStatus`, { status })
        .then(() => {
            return;
        })
        .catch((error) => {
            console.error('Update respond status error:', error);
            throw error;
        });
};

// Интерфейс для лучших совпадений
export interface BestMatchData {
    id: number;
    profession: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    date_of_birth?: string;
    country?: string;
    city?: string;
    status: boolean;
    match_score: number;
    match_details: {
        profession_match: boolean;
        skills: {
            matching: number;
            required: number;
            percentage: number;
            matching_skill_names: string[];
        };
        salary_match: 'none' | 'perfect' | 'good' | 'acceptable';
        experience: {
            candidate_months: number;
            required_months: number;
            match_percentage: number;
        };
        employment_type_match: boolean;
    };
}

// Интерфейс для ответа API лучших совпадений
export interface BestMatchesResponse {
    total: number;
    top_matches: BestMatchData[];
}

// Получить лучшие совпадения для вакансии
export const getBestMatches = (vacancyId: number): Promise<BestMatchesResponse> => {
    return api
        .get(`responds/best-matches/${vacancyId}`)
        .then((response) => {
            console.log('Best matches API response:', response.data);
            return response.data.data || { total: 0, top_matches: [] };
        })
        .catch((error) => {
            console.error('Get best matches error:', error);
            throw error;
        });
};
