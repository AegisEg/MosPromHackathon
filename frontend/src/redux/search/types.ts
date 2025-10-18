import { VacancyData } from '../vacancy/types';
import { LoadStatus } from '../../utils/types';

export interface SearchState {
  searchResults: {
    status: LoadStatus;
    data: {
      total: number;
      vacancies: VacancyData[];
    } | null;
    error: string | null;
  };
}
