import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import logo from '../../assets/logos/Explorer-logo.svg';
import { HeaderContainer } from '../../styles/Components/Common/Header.styles';

export const Header = (): JSX.Element => {
  const [lang, setLang] = useState('EN');
  return (
    <HeaderContainer>
      <div className="wrapper-header">
        <div className="header">
          <div className="left">
            <div className="explorer-logo">
              <img
                src={logo}
                alt="logo"
                className="logo"
                onClick={() => {
                  window && window.location.reload();
                }}
              />
            </div>
            <div className="menu">
              <span>Stake</span>
              <span>Validators</span>
              <span>Analytics</span>
            </div>
          </div>
          <div className="right">
            <Dropdown text={lang} icon="angle down" className="Ui-library">
              <Dropdown.Menu className="Ui-library">
                <Dropdown.Item
                  text="EN"
                  className="Ui-library"
                  onClick={() => {
                    setLang('EN');
                  }}
                />
                <Dropdown.Item
                  text="中文"
                  className="Ui-library"
                  onClick={() => {
                    setLang('中文');
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;