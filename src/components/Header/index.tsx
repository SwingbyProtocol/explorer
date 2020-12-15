import { useRouter } from 'next/router';
import React from 'react';

import { PATH } from '../../modules/env';
import { capitalize } from '../../modules/explorer';

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
} from './styled';

export const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const routing = [
    { text: 'pool', route: PATH.POOL },
    { text: 'metanodes', route: PATH.METANODES },
  ];

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
      </Right>
    </HeaderContainer>
  );
};
