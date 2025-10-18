import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFromLocalStorage, LocalStorageKeys, removeFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { getUserData } from '../../api/user';
import { mapBackendUserDataToRedux } from '../../utils/userDataMapper';

// Async thunks
export const saveTokenToStorage = createAsyncThunk(
    'auth/saveTokenToStorage',
    async (token: string, { rejectWithValue }) => {
        try {
            saveToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, token);
            return { token };
        } catch (error) {
            return rejectWithValue('Ошибка при сохранении токена');
        }
    }
);

export const getTokenFromStorage = createAsyncThunk(
    'auth/getTokenFromStorage',
    async (_, { rejectWithValue }) => {
        try {
            const token = getFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
            return { token };
        } catch (error) {
            return rejectWithValue('Ошибка при получении токена');
        }
    }
);

export const clearTokenFromStorage = createAsyncThunk(
    'auth/clearTokenFromStorage',
    async (_, { rejectWithValue }) => {
        try {
            removeFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
            return null;
        } catch (error) {
            return rejectWithValue('Ошибка при удалении токена');
        }
    }
);

export const getUserDataAction = createAsyncThunk(
    'auth/getUserDataAction',
    async (_, { rejectWithValue }) => {
        try {
            const backendData = await getUserData();
            const mappedUserData = mapBackendUserDataToRedux(backendData);
            return { userData: mappedUserData };
        } catch (error) {
            return rejectWithValue('Ошибка при получении данных пользователя');
        }
    }
);