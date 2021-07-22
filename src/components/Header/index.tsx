import { SwingbyHeader, LocaleSwitcher, ThemeSwitcher } from '@swingby-protocol/header';
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

  const items = useMemo(
    () => [
      {
        key: 'farms',
        render: 'Farms',
        href: URL.YieldFarming,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      { key: 'stake', render: 'Stake and Earn BTC', href: `/${locale}${PATH.POOL}` },
      { key: 'metanodes', render: 'Metanodes', href: `/${locale}${PATH.METANODES}` },
    ],
    [locale],
  );

  const changeLocale = useCallback((locale: string) => push(asPath, null, { locale }), [
    push,
    asPath,
  ]);

  return (
    <HeaderContainer>
      <SwingbyHeader
        productName="Explorer"
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
