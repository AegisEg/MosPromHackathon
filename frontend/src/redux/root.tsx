import { combineReducers } from 'redux';

import SettingReduces from './settings/reducer';

export const rootReducer = combineReducers({
  settings: SettingReduces,
});
