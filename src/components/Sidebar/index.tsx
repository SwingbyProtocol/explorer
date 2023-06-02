import { Icon, Testable } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { LocaleSwitcher, ThemeSwitcher } from '@swingby-protocol/header';
import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState, useMemo } from 'react';

import { useThemeSettings } from '../../modules/store/settings';
import { NavHandlerProps } from '../Layout';

import {
  SidebarInput,
  SidebarToggle,
  SidebarToggleMobile,
  SidebarContainer,
  SidebarActionContainer,
  AppLogoLink,
  MenuContainer,
  MenuItemContainer,
  MenuItemAnchor,
} from './styled';

type Props = {
  productName?: string;
  logoHref?: string;
  barItems?: React.ReactNode;
  items?: Array<
    { render: React.ReactNode; icon: React.ReactNode; key: string } & Pick<
      React.ComponentPropsWithoutRef<typeof MenuItem>,
      'onClick' | 'target' | 'href'
    >
  > | null;
} & NavHandlerProps;

type MenuItemProps = { children?: React.ReactNode; isActive?: boolean } & Testable &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'target' | 'href'>;

const TOGGLE_ID = 'sidebar-menu-toggle';
export const DEFAULT_ITEMS: Props['items'] = [
  {
    render: 'Explorer',
    icon: <Icon.NetworkVolume />,
    key: 'explorer',
    href: 'https://skybridge.info',
  },
  {
    render: 'Liquidity',
    icon: <Icon.NetworkCapacity />,
    key: 'liquidity',
    href: 'https://skybridge.info/pool',
  },
  {
    render: 'Farm',
    icon: <Icon.Filter />,
    key: 'farm',
    href: 'https://farm.swingby.network',
  },
  {
    render: 'Metanodes',
    icon: <Icon.Ledger />,
    key: 'metanodes',
    href: 'https://skybridge.info/metanodes',
  },
  {
    render: 'ERC20 Bridge',
    icon: <Icon.BinanceChainWallet />,
    key: 'erc20-bridge',
    href: 'https://bridge.swingby.network',
  },
  {
    render: 'DAO',
    icon: <Icon.Wallet />,
    key: 'dao',
    href: 'https://dao.swingby.network/',
  },
];

const MenuItem = ({
  children,
  href,
  onClick,
  target,
  isActive = false,
  'data-testid': testId,
}: MenuItemProps) => {
  return (
    <MenuItemContainer data-testid={testId}>
      {href ? (
        <MenuItemAnchor href={href} onClick={onClick} target={target} isActive={isActive}>
          {children}
        </MenuItemAnchor>
      ) : (
        children
      )}
    </MenuItemContainer>
  );
};

export const Sidebar = ({ navOpen, toggleNav, items: itemsParam = DEFAULT_ITEMS }: Props) => {
  const [href, setHref] = useState<string | null>(
    (() => {
      try {
        return window.location.href;
      } catch (e) {
        return null;
      }
    })(),
  );

  const { locale } = useIntl();

  const items = useMemo((): typeof itemsParam => {
    if (!itemsParam) return null;
    if (!locale) return itemsParam;

    return itemsParam.map((it) => {
      if (it === DEFAULT_ITEMS[0]) {
        return { ...it, href: `https://skybridge.info/${locale}` };
      }

      if (it === DEFAULT_ITEMS[1]) {
        return { ...it, href: `https://skybridge.info/${locale}/pool` };
      }

      if (it === DEFAULT_ITEMS[2]) {
        return { ...it, href: `https://farm.swingby.network/${locale}` };
      }

      if (it === DEFAULT_ITEMS[3]) {
        return { ...it, href: `https://skybridge.info/${locale}/metanodes` };
      }

      if (it === DEFAULT_ITEMS[4]) {
        return { ...it, href: `https://bridge.swingby.network/${locale}` };
      }

      if (it === DEFAULT_ITEMS[5]) {
        return { ...it, href: `https://dao.swingby.network/${locale}` };
      }

      return it;
    });
  }, [itemsParam, locale]);

  const currentItem = useMemo(() => {
    if (!href) return null;
    if (!items) return null;
    const results = items
      .filter((it) => {
        if (!it.href) return false;
        return href.toLowerCase().startsWith(it.href.toLowerCase());
      })
      .sort((a, b) => b.href!.length - a.href!.length);

    return results[0] ?? null;
  }, [href, items]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    if (!body) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        setHref(document.location.href);
      });
    });

    observer.observe(body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  const { push, asPath, locales } = useRouter();
  const [theme, setTheme] = useThemeSettings();

  const changeLocale = useCallback((locale: string) => push(asPath, null, { locale }), [
    push,
    asPath,
  ]);

  return (
    <>
      <SidebarInput type="checkbox" id={TOGGLE_ID} open={navOpen} onClick={toggleNav} />

      <SidebarContainer open={navOpen}>
        <SidebarToggle htmlFor={TOGGLE_ID} onClick={toggleNav}>
          {navOpen ? <Icon.ArrowLeft /> : <Icon.ArrowRight />}
        </SidebarToggle>
        <SidebarToggleMobile htmlFor={TOGGLE_ID} onClick={toggleNav}>
          <Icon.Cross />
        </SidebarToggleMobile>

        <AppLogoLink href={`/${locale}`}>
          {navOpen ? (
            <Icon.SwingbyWithName data-testid="sb.header.logo" />
          ) : (
            <Icon.Swingby data-testid="sb.header.logo" />
          )}
        </AppLogoLink>

        {!!items && items.length > 0 && (
          <MenuContainer>
            {items.map((it) => (
              <MenuItem
                key={it.key}
                href={it.href}
                target={it.target}
                onClick={it.onClick}
                data-testid={`sb.header.items.${it.key}`}
                isActive={!!currentItem && currentItem.href === it.href}
              >
                {it.icon}
                {navOpen && <span>{it.render}</span>}
              </MenuItem>
            ))}
          </MenuContainer>
        )}

        <SidebarActionContainer>
          <ThemeSwitcher theme={theme} onChange={setTheme} />
          {navOpen && <LocaleSwitcher locale={locale} locales={locales} onChange={changeLocale} />}
        </SidebarActionContainer>
      </SidebarContainer>
    </>
  );
};
