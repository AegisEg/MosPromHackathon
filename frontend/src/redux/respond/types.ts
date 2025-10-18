import { LoadStatus } from "../../utils/types";

export interface RespondState {
    respondToVacancy: {
        status: LoadStatus;
        error: string | null;
    };
}

