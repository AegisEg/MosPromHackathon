import api from "..";
import { RespondToVacancyRequest, RespondToVacancyResponse } from "./types";

export const respondToVacancy = (payload: RespondToVacancyRequest): Promise<RespondToVacancyResponse> => {
    return api
        .post(`vacancies/${payload.vacancyId}/respond`, {
            resume_id: payload.resumeId,
            message: payload.message || ''
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Respond to vacancy error:', error);
            throw error;
        });
};
