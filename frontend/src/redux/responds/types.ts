import { LoadStatus } from "../../utils/types";
import { RespondData, BestMatchData, AIMatchData } from "../../api/responds";

// Состояние Redux для откликов
export interface RespondsState {
    responds: {
        [vacancyId: number]: {
            status: LoadStatus;
            data: RespondData[];
            error: string | null;
        };
    };
    bestMatches: {
        [vacancyId: number]: {
            status: LoadStatus;
            data: BestMatchData[];
            error: string | null;
        };
    };
    aiMatches: {
        [vacancyId: number]: {
            status: LoadStatus;
            data: AIMatchData[];
            error: string | null;
        };
    };
    updateStatus: {
        status: LoadStatus;
        error: string | null;
    };
}
