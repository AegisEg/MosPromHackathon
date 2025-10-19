import { LoadStatus } from "../../utils/types";
import { RespondData, BestMatchData } from "../../api/responds";

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
    updateStatus: {
        status: LoadStatus;
        error: string | null;
    };
}
