import {
  SwingbyHeader,
  LocaleSwitcher,
  ThemeSwitcher,
  HEADER_DEFAULT_ITEMS,
} from '@swingby-protocol/header';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { PATH } from '../../modules/env';
import { URL } from '../../modules/links';
import { useThemeSettings } from '../../modules/store/settings';

import { HeaderContainer } from './styled';

export const Header = () => {
  const { push, asPath, locales } = useRouter();
  const { locale } = useIntl();
  const [theme, setTheme] = useThemeSettings();

  const changeLocale = useCallback((locale: string) => push(asPath, null, { locale }), [
    push,
    asPath,
  ]);

  const items = useMemo(
    () => [
      {
        key: 'Explorer',
        render: 'Explorer',
        href: PATH.ROOT,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      ...HEADER_DEFAULT_ITEMS,
      {
        key: 'erc20 bridge',
        render: 'ERC20 Bridge',
        href: URL.Erc20Bridge,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ],
    [],
  );

  return (
    <HeaderContainer>
      <SwingbyHeader
        logoHref={`/${locale}`}
        barItems={
          <>
            <ThemeSwitcher theme={theme} onChange={setTheme} />
            <LocaleSwitcher locale={locale} locales={locales} onChange={changeLocale} />
          </>
        }
        items={items}
      />
    </HeaderContainer>
  );
};
