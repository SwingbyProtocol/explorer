import { SwingbyHeader, LocaleSwitcher, ThemeSwitcher } from '@swingby-protocol/header';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useThemeSettings } from '../../modules/store/settings';
import { Sidebar } from '../Sidebar';
import { NavHandlerProps } from '../Layout';

import { HeaderContainer, HeaderAction } from './styled';

type Props = NavHandlerProps;

export const Header = ({ navOpen, setNavOpen }: Props) => {
  const { push, asPath, locales } = useRouter();
  const { locale } = useIntl();
  const [theme, setTheme] = useThemeSettings();

  const changeLocale = useCallback((locale: string) => push(asPath, null, { locale }), [
    push,
    asPath,
  ]);

  return (
    <HeaderContainer open={navOpen}>
      <Sidebar navOpen={navOpen} setNavOpen={setNavOpen} />

      <div />
      <HeaderAction>ACTION</HeaderAction>
    </HeaderContainer>
  );
};
