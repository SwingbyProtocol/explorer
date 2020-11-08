import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { HeaderContainer, Left, Logo, Menu, MenuSpan, Right } from './styled';

export const Header = () => {
  const [lang, setLang] = useState('EN');
  const router = useRouter();
  return (
    <HeaderContainer>
      <Left>
        <Logo productName="Explorer" onClick={() => router.push('/')} />
        <Menu>
          <MenuSpan variant="menu">Stake</MenuSpan>
          <MenuSpan variant="menu">Validators</MenuSpan>
          <MenuSpan variant="menu">Analytics</MenuSpan>
        </Menu>
      </Left>
      <Right>
        <Dropdown
          target={<Dropdown.DefaultTarget>{lang}</Dropdown.DefaultTarget>}
          data-testid="dropdown"
        >
          <Dropdown.Item onClick={() => setLang('EN')}>EN</Dropdown.Item>
          <Dropdown.Item onClick={() => setLang('中文')}>中文</Dropdown.Item>
        </Dropdown>
      </Right>
    </HeaderContainer>
  );
};
