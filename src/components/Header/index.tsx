import { SwingbyHeader, LocaleSwitcher, ThemeSwitcher } from '@swingby-protocol/header';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

import { PATH } from '../../modules/env';
import { useThemeSettings } from '../../modules/store/settings';

import { HeaderContainer } from './styled';

const items: React.ComponentPropsWithRef<typeof SwingbyHeader>['items'] = [
  { key: 'stake', render: 'Stake and Earn BTC', href: PATH.POOL },
  { key: 'metanodes', render: 'Metanodes', href: PATH.METANODES },
];

export const Header = () => {
  const router = useRouter();
  const { locale } = useIntl();
  const [theme, setTheme] = useThemeSettings();

  return (
    <HeaderContainer>
      <SwingbyHeader
        productName="Explorer"
        barItems={
          <>
            <ThemeSwitcher theme={theme} onChange={setTheme} />
            <LocaleSwitcher
              locale={locale}
              locales={router.locales}
              onChange={(locale) => {
                const search = typeof window !== 'undefined' && window.location.search;
                const path = search ? search : router.asPath;
                router.push(path, path, { locale });
              }}
            />
          </>
        }
        items={items}
      />
    </HeaderContainer>
  );
};
