import { createReducer } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { 
    saveTokenToStorage, 
    getTokenFromStorage, 
    clearTokenFromStorage,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: AuthState = {
    status: LoadStatus.NOT_LOADING,
    token: null,
};

const authReducer = createReducer(initialState, (builder) => {
    // saveTokenToStorage
    builder
        .addCase(saveTokenToStorage.pending, (state) => {
            state.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(saveTokenToStorage.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.status = LoadStatus.SUCCESS;
        })
        .addCase(saveTokenToStorage.rejected, (state, action) => {
            state.status = LoadStatus.ERROR;
        });

    // getTokenFromStorage
    builder
        .addCase(getTokenFromStorage.pending, (state) => {
            state.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getTokenFromStorage.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.status = !!action.payload.token ? LoadStatus.SUCCESS : LoadStatus.ERROR;
        })
        .addCase(getTokenFromStorage.rejected, (state, action) => {
            state.status = LoadStatus.ERROR;
        });

    // clearTokenFromStorage
    builder
        .addCase(clearTokenFromStorage.pending, (state) => {
            state.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(clearTokenFromStorage.fulfilled, (state) => {
            state.token = null;
            state.status = LoadStatus.NOT_LOADING;
        })
        .addCase(clearTokenFromStorage.rejected, (state) => {
            state.status = LoadStatus.ERROR;
        });
});

export default authReducer;
