import { LoadStatus } from "../../utils/types";

export interface UserData {
    id?: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    email?: string;
    role?: number;
    is_active?: boolean;
}

export interface AuthState {
    authData: {
        status: LoadStatus;
        token: string | null;
    };
    userData: {
        status: LoadStatus;
        data: UserData | null;
    };
}

// Payload types для actions
export interface SaveTokenPayload {
    token: string;
}

export interface GetTokenPayload {
    token: string | null;
}
