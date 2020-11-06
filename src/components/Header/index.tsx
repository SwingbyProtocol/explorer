import React from 'react';

import { Logo, HeaderContainer, Left, Menu, MenuSpan } from './styled';

export const Header = () => {
  return (
    <HeaderContainer>
      <Left>
        <div>
          <Logo
            src="assets/logos/Explorer-logo.svg"
            alt="logo"
            onClick={() => window.location.reload()}
          />
        </div>
        <Menu>
          <MenuSpan variant="menu">Stake</MenuSpan>
          <MenuSpan variant="menu">Validators</MenuSpan>
          <MenuSpan variant="menu">Analytics</MenuSpan>
        </Menu>
      </Left>
      {/* Todo: add dropdown */}
    </HeaderContainer>
  );
};

export default Header;
