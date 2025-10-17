export interface RegistrationResponse {
    token: string;
}

export interface RegistrationPayload {
    email: string;
    password: string;
}

export interface AuthorizationResponse {
    token: string;
}

export interface AuthorizationPayload {
    email: string;
    password: string;
}