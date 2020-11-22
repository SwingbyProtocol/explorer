import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { PATH } from '../../modules/env';
import { capitalize } from '../../modules/explorer';
import { languagesSelector } from '../../modules/i18n';

import {
  Atag,
  Hamburger,
  HeaderContainer,
  LanguageDropDown,
  LanguageDropTarget,
  LanguageTitle,
  Left,
  Logo,
  Menu,
  MenuSpan,
  MobileMenu,
  ColumnPool,
  IconLive,
  Right,
  RoutineTitle,
  DropDownItemMobile,
} from './styled';

export const Header = () => {
  const [lang, setLang] = useState('EN');
  const router = useRouter();
  const currentPath = router.pathname;

  const routing = [
    { text: 'pool', route: PATH.POOL },
    { text: 'metanodes', route: PATH.METANODES },
    { text: 'analytics', route: PATH.ANALYTICS },
  ];

  const languageItems = (
    <>
      {languagesSelector.map((language) => (
        <Dropdown.Item
          selected={lang === language.text}
          onClick={() => setLang(language.text)}
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
                  {capitalize(link.text)}
                  <IconLive variant="success" />
                </ColumnPool>
              ) : (
                <>{capitalize(link.text)}</>
              )}
            </MenuSpan>
          ))}
        </Menu>
      </Left>
      <Right>
        <MobileMenu target={<Hamburger />} data-testid="dropdown">
          <RoutineTitle variant="accent">Link</RoutineTitle>
          {routing.map((link) => (
            <DropDownItemMobile
              key={link.text}
              onClick={() => router.push(link.route)}
              isActive={link.route === currentPath}
            >
              {capitalize(link.text)}
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
        <LanguageDropDown
          target={<LanguageDropTarget size="city">{lang}</LanguageDropTarget>}
          data-testid="dropdown"
        >
          {languageItems}
        </LanguageDropDown>
      </Right>
    </HeaderContainer>
  );
};
