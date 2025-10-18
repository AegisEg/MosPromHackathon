import { CreateResumePayload, UpdateResumePayload } from '../../redux/resume/types';

export interface CreateResumeRequest extends CreateResumePayload {}

export interface UpdateResumeRequest extends Omit<UpdateResumePayload, 'id'> {}

export interface ResumeResponse {
    resume_id: number;
}
