import { createReducer } from '@reduxjs/toolkit';
import { AuthState, UserData } from './types';
import { 
    saveTokenToStorage, 
    getTokenFromStorage, 
    clearTokenFromStorage,
    getUserDataAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: AuthState = {
    authData: {
        status: LoadStatus.NOT_LOADING,
        token: null,
    },
    userData: {
        status: LoadStatus.NOT_LOADING,
        data: null,
    }
};

const authReducer = createReducer(initialState, (builder) => {
    // saveTokenToStorage
    builder
        .addCase(saveTokenToStorage.pending, (state) => {
            state.authData.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(saveTokenToStorage.fulfilled, (state, action) => {
            state.authData.token = action.payload.token;
            state.authData.status = LoadStatus.SUCCESS;
        })
        .addCase(saveTokenToStorage.rejected, (state, action) => {
            state.authData.status = LoadStatus.ERROR;
        });

    // getTokenFromStorage
    builder
        .addCase(getTokenFromStorage.pending, (state) => {
            state.authData.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getTokenFromStorage.fulfilled, (state, action) => {
            state.authData.token = action.payload.token;
            // SUCCESS означает что проверка завершена (независимо от наличия токена)
            state.authData.status = LoadStatus.SUCCESS;
        })
        .addCase(getTokenFromStorage.rejected, (state, action) => {
            state.authData.status = LoadStatus.ERROR;
        });

    // clearTokenFromStorage
    builder
        .addCase(clearTokenFromStorage.pending, (state) => {
            state.authData.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(clearTokenFromStorage.fulfilled, (state) => {
            state.authData.token = null;
            state.authData.status = LoadStatus.NOT_LOADING;
        })
        .addCase(clearTokenFromStorage.rejected, (state) => {
            state.authData.status = LoadStatus.ERROR;
        });

    builder
        .addCase(getUserDataAction.pending, (state) => {
            state.userData.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getUserDataAction.fulfilled, (state, action) => {
            state.userData.data = action.payload.userData;
            state.userData.status = LoadStatus.SUCCESS;
        })
        .addCase(getUserDataAction.rejected, (state, action) => {
            state.userData.status = LoadStatus.ERROR;
        });
});

export default authReducer;
