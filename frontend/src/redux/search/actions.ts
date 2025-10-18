import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchVacancies, SearchVacanciesParams } from '../../api/search';
import { VacancyData } from '../vacancy/types';

export const searchVacanciesAction = createAsyncThunk<
  { total: number; vacancies: VacancyData[] },
  SearchVacanciesParams,
  { rejectValue: string }
>(
  'search/searchVacancies',
  async (params, { rejectWithValue }) => {
    try {
      const response = await searchVacancies(params);
      console.log('search repsonse', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при поиске вакансий');
    }
  }
);
