import { SwingbyHeader, LocaleSwitcher, ThemeSwitcher } from '@swingby-protocol/header';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

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

  return (
    <HeaderContainer>
      <SwingbyHeader
        logoHref={`/${locale}`}
        items={[
          { render: 'Swap', key: 'swap', href: 'https://app.swingby.network' },
          { render: 'Liquidity', key: 'liquidity', href: 'https://app.swingby.network/liquidity' },
          { render: 'Explorer', key: 'explorer', href: 'https://app.swingby.network/explorer' },
          { render: 'Metanodes', key: 'metanodes', href: 'https://app.swingby.network/metanodes' },
          { render: 'DAO', key: 'dao', href: 'https://dao.swingby.network' },
        ]}
        barItems={
          <>
            <ThemeSwitcher theme={theme} onChange={setTheme} />
            <LocaleSwitcher locale={locale} locales={locales} onChange={changeLocale} />
          </>
        }
      />
    </HeaderContainer>
  );
};
