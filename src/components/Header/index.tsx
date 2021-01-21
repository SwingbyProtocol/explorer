import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'styled-components';

import { getInitialLanguage } from '../../modules/common';
import { LOCAL_STORAGE, PATH } from '../../modules/env';
import { capitalize, TTheme } from '../../modules/explorer';
import { languagesSelector } from '../../modules/i18n';
import { toggleTheme } from '../../modules/store';

import {
  Atag,
  ColumnPool,
  DropDownItemMobile,
  Hamburger,
  HeaderContainer,
  IconLive,
  LanguageDropDown,
  LanguageDropTarget,
  LanguageTitle,
  Left,
  Logo,
  Menu,
  MenuSpan,
  MobileMenu,
  Right,
  TextLang,
  ThemeToggle,
} from './styled';

interface Props {
  setThemeMode: (theme: string) => void;
  themeMode: TTheme;
}

export const Header = (props: Props) => {
  const { setThemeMode, themeMode } = props;
  const router = useRouter();
  const { locale } = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentPath = router.pathname;
  const [lang, setLang] = useState(getInitialLanguage(locale));

  const toggleDarkMode = (checked: boolean) => {
    const theme = checked ? 'dark' : 'light';
    setThemeMode(theme);
    localStorage.setItem(LOCAL_STORAGE.ThemeMode, theme);
  };

  useEffect(() => {
    if (themeMode === null) {
      setThemeMode(theme.pulsar.id === 'PulsarDark' ? 'dark' : 'light');
    }
    dispatch(toggleTheme(themeMode));
  }, [themeMode, dispatch, setThemeMode, theme.pulsar.id]);

  useEffect(() => {
    languagesSelector.forEach((language) => {
      language.code === locale && setLang(language.text);
    });
  }, [locale]);

  const routing = [
    { text: 'Stake and Earn BTC', route: PATH.POOL },
    { text: 'Metanodes', route: PATH.METANODES },
  ];

  const languageItems = (
    <>
      {languagesSelector.map((language) => (
        <Dropdown.Item
          selected={lang === language.text}
          onClick={() => {
            const search = typeof window !== 'undefined' && window.location.search;
            // Memo: asPath: To consider dynamic path for swap detail page
            const path = search ? search : router.asPath;
            router.push(path, path, { locale: language.code });
          }}
          key={language.code}
        >
          {language.text}
        </Dropdown.Item>
      ))}
    </>
  );

  return (
    <HeaderContainer>
      <Left>
        <Atag href={PATH.ROOT}>
          <Logo productName="Explorer" />
        </Atag>
      </Left>
      <Right>
        <ThemeToggle>
          <DarkModeSwitch checked={themeMode === 'dark'} onChange={toggleDarkMode} size={24} />
        </ThemeToggle>
        <MobileMenu target={<Hamburger />} data-testid="dropdown">
          {routing.map((link) => (
            <DropDownItemMobile
              key={link.text}
              onClick={() => router.push(link.route)}
              isActive={link.route === currentPath}
            >
              {link.text}
            </DropDownItemMobile>
          ))}
          <Dropdown.Divider />
          <Dropdown
            target={<LanguageTitle size="city">Language</LanguageTitle>}
            data-testid="dropdown"
          >
            {languageItems}
          </Dropdown>
        </MobileMenu>

        {/* Media: screen > sm */}
        <Menu>
          {routing.map((link) => (
            <MenuSpan
              variant="menu"
              key={link.text}
              onClick={() => router.push(link.route)}
              isActive={link.route === currentPath}
            >
              {link.route === PATH.POOL ? (
                <ColumnPool>
                  {link.text}
                  <IconLive />
                </ColumnPool>
              ) : (
                <>{capitalize(link.text)}</>
              )}
            </MenuSpan>
          ))}
        </Menu>
        <LanguageDropDown
          target={
            <LanguageDropTarget size="city">
              <TextLang>{lang}</TextLang>
            </LanguageDropTarget>
          }
          data-testid="dropdown"
        >
          {languageItems}
        </LanguageDropDown>
      </Right>
    </HeaderContainer>
  );
};
