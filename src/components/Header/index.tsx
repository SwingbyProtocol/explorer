import { Dropdown } from '@swingby-protocol/pulsar';
import Link from 'next/link';
import React, { useState } from 'react';

import { languagesSelector } from '../../modules/i18n';

import {
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
    { text: 'Stake', route: '/' },
    { text: 'Metanodes', route: '/' },
    { text: 'Analytics', route: '/' },
  ];
  const languageItems = (
    <>
      {languagesSelector.map((language) => (
        <Dropdown.Item selected={lang === language.text} onClick={() => setLang(language.text)}>
          {language.text}
        </Dropdown.Item>
      ))}
    </>
  );

  return (
    <HeaderContainer>
      <Left>
        <Link href="/">
          <Logo
            productName="Explorer"
            onClick={() => {
              // Memo: To reset URL and state
              // Request: Perhaps make `AppLogo` components with `a tag (<a></a>)` but without changing color
              setTimeout(() => {
                window.location.reload();
              }, 10);
            }}
          />
        </Link>
        <Menu>
          {routing.map((link) => (
            <MenuSpan variant="menu">{link.text}</MenuSpan>
          ))}
        </Menu>
      </Left>
      <Right>
        <MobileMenu target={<Hamburger />} data-testid="dropdown">
          <RoutineTitle variant="accent">Link</RoutineTitle>
          {routing.map((link) => (
            <Dropdown.Item>{link.text}</Dropdown.Item>
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
