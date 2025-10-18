import api from "..";
import { VacancyData, BackendVacancyData } from "../../redux/vacancy/types";
import { mapBackendVacancyDataToRedux } from "../../utils/vacancyDataMapper";

export interface SearchVacanciesParams {
  profession_id?: number;
  salary_from?: number;
  salary_to?: number;
  employment_type?: number;
  title?: string;
  experience_wide?: number;
  company_id?: number;
  user_id?: number;
}

export interface SearchVacanciesResponse {
  total: number;
  vacancies: VacancyData[];
}

export const searchVacancies = (params: SearchVacanciesParams): Promise<SearchVacanciesResponse> => {
  const queryParams = new URLSearchParams();
  
  // Добавляем только непустые параметры
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  return api
    .get(`search/vacancies/?${queryParams.toString()}`)
    .then((response) => {
      // Извлекаем данные из response.data.data и маппим их
      const backendData = response.data.data;
      return {
        total: backendData.total,
        vacancies: backendData.vacancies.map((vacancy: BackendVacancyData) => 
          mapBackendVacancyDataToRedux(vacancy)
        )
      };
    })
    .catch((error) => {
      console.error('Search vacancies error:', error);
      throw error;
    });
};
