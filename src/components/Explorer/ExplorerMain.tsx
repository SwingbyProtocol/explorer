import React from 'react';
import { Input } from 'semantic-ui-react';
import { ExplorerMainContainer } from 'src/styles/Components/Explorer/ExplorerMain.styles';

import Browser from './Browser';

const ExplorerMain = (): JSX.Element => {
  return (
    <ExplorerMainContainer>
      <div className="wrapper-explorer-main">
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
      </div>
    </ExplorerMainContainer>
  );
};

export default ExplorerMain;
