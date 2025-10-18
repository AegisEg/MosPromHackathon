import { createReducer } from '@reduxjs/toolkit';
import { InternshipState } from './types';
import {
    getInternshipsAction,
    getInternshipByIdAction,
    createInternshipAction,
    updateInternshipAction,
    deleteInternshipAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: InternshipState = {
    internships: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
    currentInternship: {
        status: LoadStatus.NOT_LOADING,
        data: null,
    },
    createInternship: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    updateInternship: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    deleteInternship: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const internshipReducer = createReducer(initialState, (builder) => {
    // getInternshipsAction
    builder
        .addCase(getInternshipsAction.pending, (state) => {
            state.internships.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getInternshipsAction.fulfilled, (state, action) => {
            state.internships.data = action.payload.internships;
            state.internships.status = LoadStatus.SUCCESS;
        })
        .addCase(getInternshipsAction.rejected, (state, action) => {
            state.internships.status = LoadStatus.ERROR;
        });

    // getInternshipByIdAction
    builder
        .addCase(getInternshipByIdAction.pending, (state) => {
            state.currentInternship.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getInternshipByIdAction.fulfilled, (state, action) => {
            state.currentInternship.data = action.payload.internship;
            state.currentInternship.status = LoadStatus.SUCCESS;
        })
        .addCase(getInternshipByIdAction.rejected, (state, action) => {
            state.currentInternship.status = LoadStatus.ERROR;
        });

    // createInternshipAction
    builder
        .addCase(createInternshipAction.pending, (state) => {
            state.createInternship.status = LoadStatus.IN_PROGRESS;
            state.createInternship.error = null;
        })
        .addCase(createInternshipAction.fulfilled, (state, action) => {
            state.internships.data.push(action.payload.internship);
            state.createInternship.status = LoadStatus.SUCCESS;
            state.createInternship.error = null;
        })
        .addCase(createInternshipAction.rejected, (state, action) => {
            state.createInternship.status = LoadStatus.ERROR;
            state.createInternship.error = action.payload as string;
        });

    // updateInternshipAction
    builder
        .addCase(updateInternshipAction.pending, (state) => {
            state.updateInternship.status = LoadStatus.IN_PROGRESS;
            state.updateInternship.error = null;
        })
        .addCase(updateInternshipAction.fulfilled, (state, action) => {
            const updatedInternship = action.payload.internship;
            const index = state.internships.data.findIndex(internship => internship.id === updatedInternship.id);
            if (index !== -1) {
                state.internships.data[index] = updatedInternship;
            }
            if (state.currentInternship.data?.id === updatedInternship.id) {
                state.currentInternship.data = updatedInternship;
            }
            state.updateInternship.status = LoadStatus.SUCCESS;
            state.updateInternship.error = null;
        })
        .addCase(updateInternshipAction.rejected, (state, action) => {
            state.updateInternship.status = LoadStatus.ERROR;
            state.updateInternship.error = action.payload as string;
        });

    // deleteInternshipAction
    builder
        .addCase(deleteInternshipAction.pending, (state) => {
            state.deleteInternship.status = LoadStatus.IN_PROGRESS;
            state.deleteInternship.error = null;
        })
        .addCase(deleteInternshipAction.fulfilled, (state, action) => {
            const deletedId = action.payload.id;
            state.internships.data = state.internships.data.filter(internship => internship.id !== deletedId);
            if (state.currentInternship.data?.id === deletedId) {
                state.currentInternship.data = null;
            }
            state.deleteInternship.status = LoadStatus.SUCCESS;
            state.deleteInternship.error = null;
        })
        .addCase(deleteInternshipAction.rejected, (state, action) => {
            state.deleteInternship.status = LoadStatus.ERROR;
            state.deleteInternship.error = action.payload as string;
        });
});

export default internshipReducer;

