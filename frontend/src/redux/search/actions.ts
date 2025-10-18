import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchVacancies, SearchVacanciesParams, searchInternships, SearchInternshipsParams } from '../../api/search';
import { VacancyData } from '../vacancy/types';
import { InternshipData } from '../internship/types';

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

export const searchInternshipsAction = createAsyncThunk<
  { total: number; internships: InternshipData[] },
  SearchInternshipsParams,
  { rejectValue: string }
>(
  'search/searchInternships',
  async (params, { rejectWithValue }) => {
    try {
      const response = await searchInternships(params);
      console.log('search internships response', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при поиске стажировок');
    }
  }
);
