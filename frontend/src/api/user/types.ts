export interface RegistrationResponse {
    token: string;
}

export interface RegistrationPayload {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    password: string;
    role: number;
}

export interface AuthorizationResponse {
    token: string;
}

export interface AuthorizationPayload {
    email: string;
    password: string;
}