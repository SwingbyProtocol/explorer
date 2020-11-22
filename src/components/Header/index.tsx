import { Dropdown } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';

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
  Right,
  RoutineTitle,
} from './styled';

export const Header = () => {
  const [lang, setLang] = useState('EN');
  const routing = [
    { text: 'Pool', route: '/' },
    { text: 'Metanodes', route: '/' },
    { text: 'Analytics', route: '/' },
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
        {/* Memo: To reset URL and state */}
        {/* Request: Perhaps make `AppLogo` components with `a tag (<a></a>)` but without changing logo color */}
        <Atag href="/">
          <Logo productName="Explorer" />
        </Atag>
        <Menu>
          {routing.map((link) => (
            <MenuSpan variant="menu" key={link.text}>
              {link.text}
            </MenuSpan>
          ))}
        </Menu>
      </Left>
      <Right>
        <MobileMenu target={<Hamburger />} data-testid="dropdown">
          <RoutineTitle variant="accent">Link</RoutineTitle>
          {routing.map((link) => (
            <Dropdown.Item key={link.text}>{link.text}</Dropdown.Item>
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
