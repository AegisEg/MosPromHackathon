import { createReducer } from '@reduxjs/toolkit';
import { ResumeState } from './types';
import { 
    getUserResumesAction,
    getResumeAction,
    createResumeAction,
    updateResumeAction,
    deleteResumeAction
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: ResumeState = {
    resumes: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
    currentResume: {
        status: LoadStatus.NOT_LOADING,
        data: null,
    },
    createResume: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    updateResume: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    deleteResume: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const resumeReducer = createReducer(initialState, (builder) => {
    // getUserResumesAction
    builder
        .addCase(getUserResumesAction.pending, (state) => {
            state.resumes.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getUserResumesAction.fulfilled, (state, action) => {
            state.resumes.status = LoadStatus.SUCCESS;
            state.resumes.data = action.payload;
        })
        .addCase(getUserResumesAction.rejected, (state) => {
            state.resumes.status = LoadStatus.ERROR;
        });

    // getResumeAction
    builder
        .addCase(getResumeAction.pending, (state) => {
            state.currentResume.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getResumeAction.fulfilled, (state, action) => {
            state.currentResume.status = LoadStatus.SUCCESS;
            state.currentResume.data = action.payload;
        })
        .addCase(getResumeAction.rejected, (state) => {
            state.currentResume.status = LoadStatus.ERROR;
        });

    // createResumeAction
    builder
        .addCase(createResumeAction.pending, (state) => {
            state.createResume.status = LoadStatus.IN_PROGRESS;
            state.createResume.error = null;
        })
        .addCase(createResumeAction.fulfilled, (state, action) => {
            state.createResume.status = LoadStatus.SUCCESS;
            state.createResume.error = null;
            // После создания резюме обновляем список
            // Новое резюме будет загружено при следующем вызове getUserResumesAction
        })
        .addCase(createResumeAction.rejected, (state, action) => {
            state.createResume.status = LoadStatus.ERROR;
            state.createResume.error = action.payload || 'Ошибка при создании резюме';
        });

    // updateResumeAction
    builder
        .addCase(updateResumeAction.pending, (state) => {
            state.updateResume.status = LoadStatus.IN_PROGRESS;
            state.updateResume.error = null;
        })
        .addCase(updateResumeAction.fulfilled, (state) => {
            state.updateResume.status = LoadStatus.SUCCESS;
            state.updateResume.error = null;
        })
        .addCase(updateResumeAction.rejected, (state, action) => {
            state.updateResume.status = LoadStatus.ERROR;
            state.updateResume.error = action.payload || 'Ошибка при обновлении резюме';
        });

    // deleteResumeAction
    builder
        .addCase(deleteResumeAction.pending, (state) => {
            state.deleteResume.status = LoadStatus.IN_PROGRESS;
            state.deleteResume.error = null;
        })
        .addCase(deleteResumeAction.fulfilled, (state, action) => {
            state.deleteResume.status = LoadStatus.SUCCESS;
            state.deleteResume.error = null;
            // Удаляем резюме из списка
            state.resumes.data = state.resumes.data.filter(resume => resume.id !== action.payload);
        })
        .addCase(deleteResumeAction.rejected, (state, action) => {
            state.deleteResume.status = LoadStatus.ERROR;
            state.deleteResume.error = action.payload || 'Ошибка при удалении резюме';
        });
});

export default resumeReducer;
