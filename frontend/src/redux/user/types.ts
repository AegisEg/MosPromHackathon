import { LoadStatus } from "../../utils/types";
import { UserRole } from "../../enums/UserRole";

// Данные с бэкенда в snake_case
export interface BackendUserData {
    id?: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    email?: string;
    role?: number;
    is_active?: boolean;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

// Данные в Redux с маппингом роли
export interface UserData {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    role?: UserRole;
    isActive?: boolean;
    emailVerifiedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
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
