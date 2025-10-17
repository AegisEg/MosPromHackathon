import { LoadStatus } from "../../utils/types";

export interface AuthState {
    status: LoadStatus;
    token: string | null;
}

// Payload types для actions
export interface SaveTokenPayload {
    token: string;
}

export interface GetTokenPayload {
    token: string | null;
}
