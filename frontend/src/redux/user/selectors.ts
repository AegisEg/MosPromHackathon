import { RootState } from '../store';

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectUserData = (state: RootState) => state.auth.userData;