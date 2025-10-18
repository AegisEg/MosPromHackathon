import { createReducer } from '@reduxjs/toolkit';
import { SearchState } from './types';
import { searchVacanciesAction, searchInternshipsAction } from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: SearchState = {
  searchResults: {
    status: LoadStatus.NOT_LOADING,
    data: null,
    error: null,
  },
  searchInternshipsResults: {
    status: LoadStatus.NOT_LOADING,
    data: null,
    error: null,
  },
};

const searchReducer = createReducer(initialState, (builder) => {
  // Поиск вакансий
  builder
    .addCase(searchVacanciesAction.pending, (state) => {
      state.searchResults.status = LoadStatus.IN_PROGRESS;
      state.searchResults.error = null;
    })
    .addCase(searchVacanciesAction.fulfilled, (state, action) => {
      state.searchResults.status = LoadStatus.SUCCESS;
      state.searchResults.data = action.payload;
      state.searchResults.error = null;
    })
    .addCase(searchVacanciesAction.rejected, (state, action) => {
      state.searchResults.status = LoadStatus.ERROR;
      state.searchResults.error = action.payload || 'Ошибка при поиске вакансий';
    });

  // Поиск стажировок
  builder
    .addCase(searchInternshipsAction.pending, (state) => {
      state.searchInternshipsResults.status = LoadStatus.IN_PROGRESS;
      state.searchInternshipsResults.error = null;
    })
    .addCase(searchInternshipsAction.fulfilled, (state, action) => {
      state.searchInternshipsResults.status = LoadStatus.SUCCESS;
      state.searchInternshipsResults.data = action.payload;
      state.searchInternshipsResults.error = null;
    })
    .addCase(searchInternshipsAction.rejected, (state, action) => {
      state.searchInternshipsResults.status = LoadStatus.ERROR;
      state.searchInternshipsResults.error = action.payload || 'Ошибка при поиске стажировок';
    });
});

export default searchReducer;
