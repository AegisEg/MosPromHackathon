export enum UserRole {
    EMPLOYER = 'employer',
    JOB_SEEKER = 'job_seeker', 
    ADMIN = 'admin',
    INSTITUTE = 'institute'
}

export const UserRoleLabels = {
    [UserRole.EMPLOYER]: 'Работодатель',
    [UserRole.JOB_SEEKER]: 'Соискатель',
    [UserRole.ADMIN]: 'Администратор',
    [UserRole.INSTITUTE]: 'Институт',
} as const;
