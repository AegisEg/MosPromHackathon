export interface RespondToVacancyRequest {
    vacancyId: number;
    resumeId: number;
    message?: string;
}

export interface RespondToVacancyResponse {
    success: boolean;
    message: string;
}
