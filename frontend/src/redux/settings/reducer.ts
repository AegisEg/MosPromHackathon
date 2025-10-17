import {
  SETTINGS_LOADING,
} from './types';
import { LoadStatus } from '../../utils/types';

const INITIAL_STATE = {
  loadStatus: LoadStatus.NOT_LOADING,
  settings: []
};

const settings = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SETTINGS_LOADING:
      return {
        ...state,
        loadStatus: LoadStatus.IN_PROGRESS,
      };
    default:
      return state;
  }
};

export default settings;
