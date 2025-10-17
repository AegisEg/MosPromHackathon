import { RootState } from '../store';

export const selectToken = (state: RootState) => state.auth.token;

export const selectAuthStatus = (state: RootState) => state.auth.status;