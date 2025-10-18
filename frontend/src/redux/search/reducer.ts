import { createReducer } from '@reduxjs/toolkit';
import { SearchState } from './types';
import { searchVacanciesAction } from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: SearchState = {
  searchResults: {
    status: LoadStatus.NOT_LOADING,
    data: null,
    error: null,
  },
};

const searchReducer = createReducer(initialState, (builder) => {
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
});

export default searchReducer;
