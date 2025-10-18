import { combineReducers } from 'redux';

import SettingReduces from './settings/reducer';
import authReducer from './user/reducer';

export const rootReducer = combineReducers({
  settings: SettingReduces,
  auth: authReducer,
});
