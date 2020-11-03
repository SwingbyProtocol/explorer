import React from 'react';
import { Input } from 'semantic-ui-react';

import Browser from './Browser';
import { ExplorerMainContainer } from './ExplorerMain.styles';

const ExplorerMain = (): JSX.Element => {
  return (
    <ExplorerMainContainer>
      <div className="head-line">
        <div className="left">
          <h1 className="title-text">Skybridge Explorer</h1>
        </div>
        <div className="right">
          <div className="search-input">
            <Input
              icon="search"
              placeholder="Search by address or Txn Hash"
              className="Ui-library"
            />
          </div>
        </div>
      </div>
      <Browser />
    </ExplorerMainContainer>
  );
};

export default ExplorerMain;
