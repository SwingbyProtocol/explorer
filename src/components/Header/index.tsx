import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { PATH } from '../../modules/env';
import { capitalize } from '../../modules/explorer';
import { languagesSelector } from '../../modules/i18n';

import {
  Atag,
  ColumnPool,
  DropDownItemMobile,
  Hamburger,
  HeaderContainer,
  IconLive,
  Left,
  Logo,
  Menu,
  MenuSpan,
  MobileMenu,
  Right,
  LanguageDropDown,
  LanguageDropTarget,
  LanguageTitle,
} from './styled';

export const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { locale } = useIntl();
  const [lang, setLang] = useState(null);

  useEffect(() => {
    languagesSelector.forEach((language) => {
      language.code === locale && setLang(language.text);
    });
  }, [locale]);

  const routing = [
    { text: 'pool', route: PATH.POOL },
    { text: 'metanodes', route: PATH.METANODES },
  ];

  const languageItems = (
    <>
      {languagesSelector.map((language) => (
        <Dropdown.Item
          selected={lang === language.text}
          // Memo: asPath: To consider dynamic path for swap detail page
          onClick={() => router.push(router.asPath, router.asPath, { locale: language.code })}
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
        <MobileMenu target={<Hamburger />} data-testid="dropdown">
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
