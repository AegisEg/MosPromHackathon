import { combineReducers } from 'redux';

import SettingReduces from './settings/reducer';
import authReducer from './user/reducer';
import companyReducer from './company/reducer';
import vacancyReducer from './vacancy/reducer';
import professionReducer from './profession/reducer';
import searchReducer from './search/reducer';
import resumeReducer from './resume/reducer';
import internshipReducer from './internship/reducer';
import respondReducer from './respond/reducer';
import respondsReducer from './responds/reducer';
import analyticsReducer from './analytics/reducer';

export const rootReducer = combineReducers({
  settings: SettingReduces,
  auth: authReducer,
  company: companyReducer,
  vacancy: vacancyReducer,
  profession: professionReducer,
  search: searchReducer,
  resume: resumeReducer,
  internship: internshipReducer,
  respond: respondReducer,
  responds: respondsReducer,
  analytics: analyticsReducer,
});
