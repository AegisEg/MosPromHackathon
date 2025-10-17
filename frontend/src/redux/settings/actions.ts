import { AppDispatch } from '../store';
import {
  SETTINGS_LOADING,
} from './types';

export const getSettings = () => (dispatch: AppDispatch) => {
  dispatch({
    type: SETTINGS_LOADING,
  });
};
