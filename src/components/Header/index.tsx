import { Dropdown } from '@swingby-protocol/pulsar';
import Link from 'next/link';
import React, { useState } from 'react';

import { HeaderContainer, Left, Logo, Menu, MenuSpan, Right } from './styled';

export const Header = () => {
  const [lang, setLang] = useState('EN');
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
          <MenuSpan variant="menu">Stake</MenuSpan>
          <MenuSpan variant="menu">Validators</MenuSpan>
          <MenuSpan variant="menu">Analytics</MenuSpan>
        </Menu>
      </Left>
      <Right>
        <Dropdown
          target={<Dropdown.DefaultTarget size="city">{lang}</Dropdown.DefaultTarget>}
          data-testid="dropdown"
        >
          <Dropdown.Item onClick={() => setLang('EN')}>EN</Dropdown.Item>
          <Dropdown.Item onClick={() => setLang('中文')}>中文</Dropdown.Item>
        </Dropdown>
      </Right>
    </HeaderContainer>
  );
};
