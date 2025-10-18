import { createReducer } from '@reduxjs/toolkit';
import { CompanyState } from './types';
import {
    getCompaniesAction,
    getCompanyByIdAction,
    createCompanyAction,
    updateCompanyAction,
    deleteCompanyAction,
} from './actions';
import { LoadStatus } from '../../utils/types';

const initialState: CompanyState = {
    companies: {
        status: LoadStatus.NOT_LOADING,
        data: [],
    },
    currentCompany: {
        status: LoadStatus.NOT_LOADING,
        data: null,
    },
    createCompany: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    updateCompany: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
    deleteCompany: {
        status: LoadStatus.NOT_LOADING,
        error: null,
    },
};

const companyReducer = createReducer(initialState, (builder) => {
    // getCompaniesAction
    builder
        .addCase(getCompaniesAction.pending, (state) => {
            state.companies.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getCompaniesAction.fulfilled, (state, action) => {
            state.companies.data = action.payload.companies;
            state.companies.status = LoadStatus.SUCCESS;
        })
        .addCase(getCompaniesAction.rejected, (state, action) => {
            state.companies.status = LoadStatus.ERROR;
        });

    // getCompanyByIdAction
    builder
        .addCase(getCompanyByIdAction.pending, (state) => {
            state.currentCompany.status = LoadStatus.IN_PROGRESS;
        })
        .addCase(getCompanyByIdAction.fulfilled, (state, action) => {
            state.currentCompany.data = action.payload.company;
            state.currentCompany.status = LoadStatus.SUCCESS;
        })
        .addCase(getCompanyByIdAction.rejected, (state, action) => {
            state.currentCompany.status = LoadStatus.ERROR;
        });

    // createCompanyAction
    builder
        .addCase(createCompanyAction.pending, (state) => {
            state.createCompany.status = LoadStatus.IN_PROGRESS;
            state.createCompany.error = null;
        })
        .addCase(createCompanyAction.fulfilled, (state, action) => {
            state.companies.data.push(action.payload.company);
            state.createCompany.status = LoadStatus.SUCCESS;
            state.createCompany.error = null;
        })
        .addCase(createCompanyAction.rejected, (state, action) => {
            state.createCompany.status = LoadStatus.ERROR;
            state.createCompany.error = action.payload as string;
        });

    // updateCompanyAction
    builder
        .addCase(updateCompanyAction.pending, (state) => {
            state.updateCompany.status = LoadStatus.IN_PROGRESS;
            state.updateCompany.error = null;
        })
        .addCase(updateCompanyAction.fulfilled, (state, action) => {
            const updatedCompany = action.payload.company;
            const index = state.companies.data.findIndex(company => company.id === updatedCompany.id);
            if (index !== -1) {
                state.companies.data[index] = updatedCompany;
            }
            if (state.currentCompany.data?.id === updatedCompany.id) {
                state.currentCompany.data = updatedCompany;
            }
            state.updateCompany.status = LoadStatus.SUCCESS;
            state.updateCompany.error = null;
        })
        .addCase(updateCompanyAction.rejected, (state, action) => {
            state.updateCompany.status = LoadStatus.ERROR;
            state.updateCompany.error = action.payload as string;
        });

    // deleteCompanyAction
    builder
        .addCase(deleteCompanyAction.pending, (state) => {
            state.deleteCompany.status = LoadStatus.IN_PROGRESS;
            state.deleteCompany.error = null;
        })
        .addCase(deleteCompanyAction.fulfilled, (state, action) => {
            const deletedId = action.payload.id;
            state.companies.data = state.companies.data.filter(company => company.id !== deletedId);
            if (state.currentCompany.data?.id === deletedId) {
                state.currentCompany.data = null;
            }
            state.deleteCompany.status = LoadStatus.SUCCESS;
            state.deleteCompany.error = null;
        })
        .addCase(deleteCompanyAction.rejected, (state, action) => {
            state.deleteCompany.status = LoadStatus.ERROR;
            state.deleteCompany.error = action.payload as string;
        });
});

export default companyReducer;
