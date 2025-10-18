import { RootState } from '../store';

// Селекторы для поиска вакансий
export const selectSearchResultsData = (state: RootState) => state.search.searchResults.data;
export const selectSearchResultsStatus = (state: RootState) => state.search.searchResults.status;
export const selectSearchResultsError = (state: RootState) => state.search.searchResults.error;

// Селекторы для поиска стажировок
export const selectSearchInternshipsData = (state: RootState) => state.search.searchInternshipsResults.data;
export const selectSearchInternshipsStatus = (state: RootState) => state.search.searchInternshipsResults.status;
export const selectSearchInternshipsError = (state: RootState) => state.search.searchInternshipsResults.error;
