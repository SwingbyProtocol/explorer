import { DefaultRootState } from 'react-redux';

import { SettingsState, ThemeType } from '../types';

export const settingsSelector = (state: DefaultRootState): SettingsState => state.settings;

// @todo (agustin) add redux toolkit and use createSelector with settingsSelector
export const themeSelector = (state: DefaultRootState): ThemeType => state.settings.theme;
