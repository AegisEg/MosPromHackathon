import api from "..";
import { ResumeData, BackendResumeData, CreateResumePayload, UpdateResumePayload } from "../../redux/resume/types";
import { mapBackendResumeDataToRedux, mapResumeDataToBackend } from "../../utils/resumeDataMapper";
import { ResumeResponse } from "./types";

export const getResumeById = (id: number): Promise<ResumeData> => {
    return api
        .get(`resume/show/${id}`)
        .then((response) => {
            console.log('Raw API response:', response.data);
            const backendData = response.data.data;
            console.log('Backend data before mapping:', backendData);
            const mappedData = mapBackendResumeDataToRedux(backendData);
            console.log('Mapped data:', mappedData);
            return mappedData;
        })
        .catch((error) => {
            console.error('Get resume error:', error);
            throw error;
        });
};

export const getUserResumes = (): Promise<ResumeData[]> => {
    return api
        .get('resume/index')
        .then((response) => {
            const backendData = response.data.data.resumes;
            console.log('Backend resumes data:', backendData);
            
            // Маппим данные вручную, так как бэкенд возвращает другую структуру
            return backendData.map((resume: any) => ({
                id: resume.id,
                userId: resume.user_id,
                dateOfBirth: resume.date_of_birth,
                city: resume.city,
                country: resume.country,
                education: resume.education,
                phone: resume.phone,
                about: resume.about,
                professionId: resume.profession_id || (resume.profession ? parseInt(resume.profession) : 0),
                profession: resume.profession, // Добавляем название профессии
                salary: resume.salary,
                status: resume.status,
                createdAt: resume.created_at,
                updatedAt: resume.updated_at,
                skills: resume.skills?.map((skill: any) => skill.id) || [],
                educations: resume.educations || [],
                experiences: resume.experiences || [],
            }));
        })
        .catch((error) => {
            console.error('Get user resumes error:', error);
            throw error;
        });
};

export const createResume = (payload: CreateResumePayload): Promise<ResumeResponse> => {
    const backendPayload = mapResumeDataToBackend(payload);
    
    return api
        .post('resume/store', backendPayload)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.error('Create resume error:', error);
            throw error;
        });
};

export const updateResume = (payload: UpdateResumePayload): Promise<ResumeResponse> => {
    const { id, ...updateData } = payload;
    const backendPayload = mapResumeDataToBackend(updateData);
    
    return api
        .patch(`resume/update/${id}`, backendPayload)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.error('Update resume error:', error);
            throw error;
        });
};
export const deleteResume = (id: number): Promise<void> => {
    return api
        .delete(`resume/delete/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Delete resume error:', error);
            throw error;
        });
};

