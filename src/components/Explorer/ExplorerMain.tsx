import { Icon, TextInput } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';

import Browser from './Browser';
import { ExplorerMainContainer } from './ExplorerMain.styles';

const ExplorerMain = (): JSX.Element => {
  const [search, setSearch] = useState('');
  return (
    <ExplorerMainContainer>
      <div className="head-line">
        <div className="left-head-line ">
          <h1 className="title-text">Skybridge Explorer</h1>
        </div>
        <div className="right-head-line ">
          <div className="search-input">
            {/* Todo: Make Input height as 4.6 or 5.6 rem */}
            <TextInput
              size="country"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Search by address or Txn Hash"
              right={<Icon.Search size="country" className="search-icon" />}
            />
          </div>
        </div>
      </div>
      <Browser />
    </ExplorerMainContainer>
  );
};

export { ExplorerMain };
