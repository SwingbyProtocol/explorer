import { useMemo } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';

import { LOCAL_STORAGE } from '../../env';

import { actionSetSettings } from './reducer';

export const useThemeSettings = () => {
  const theme = useSelector((state) => state.settings.theme);
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
