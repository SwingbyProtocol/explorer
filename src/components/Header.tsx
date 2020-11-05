import React from 'react';

import { HeaderContainer } from './Header.styled';

export const Header = () => {
  return (
    <HeaderContainer>
      <div className="header">
        <div className="left">
          <div className="explorer-logo">
            <img
              src="assets/logos/Explorer-logo.svg"
              alt="logo"
              className="logo"
              onClick={() => window.location.reload()}
            />
          </div>
          <div className="menu">
            <span>Stake</span>
            <span>Validators</span>
            <span>Analytics</span>
          </div>
        </div>
        <div className="right">{/* Todo: add dropdown */}</div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
