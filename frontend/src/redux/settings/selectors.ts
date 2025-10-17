import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectSetting = (state: RootState) => state.settings;

export const settings = createSelector([selectSetting], (settings) => settings.settings);

export const selectSettingsLoadStatus = createSelector(
  [selectSetting],
  (settings) => settings.loadStatus
);
