import { RootState } from '../store';

export const selectSearchResultsData = (state: RootState) => state.search.searchResults.data;
export const selectSearchResultsStatus = (state: RootState) => state.search.searchResults.status;
export const selectSearchResultsError = (state: RootState) => state.search.searchResults.error;
