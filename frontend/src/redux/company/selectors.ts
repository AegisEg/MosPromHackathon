import { RootState } from '../store';

export const selectCompanies = (state: RootState) => state.company.companies;
export const selectCurrentCompany = (state: RootState) => state.company.currentCompany;
export const selectCreateCompany = (state: RootState) => state.company.createCompany;
export const selectUpdateCompany = (state: RootState) => state.company.updateCompany;
export const selectDeleteCompany = (state: RootState) => state.company.deleteCompany;

// Селекторы для удобства
export const selectCompaniesData = (state: RootState) => state.company.companies.data;
export const selectCompaniesStatus = (state: RootState) => state.company.companies.status;
export const selectCurrentCompanyData = (state: RootState) => state.company.currentCompany.data;
export const selectCurrentCompanyStatus = (state: RootState) => state.company.currentCompany.status;
