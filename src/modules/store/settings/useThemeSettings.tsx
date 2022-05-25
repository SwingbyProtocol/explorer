import { useMemo } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';

import { LOCAL_STORAGE } from '../../env';

import { actionSetSettings } from './reducer';
import { themeSelector } from './selectors';

export const useThemeSettings = () => {
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();
  return useMemo(() => {
    return [
      theme,
      (theme: DefaultRootState['settings']['theme']) => {
        dispatch(actionSetSettings({ theme }));
        localStorage.setItem(LOCAL_STORAGE.Theme, theme);
      },
    ] as const;
  }, [theme, dispatch]);
};
