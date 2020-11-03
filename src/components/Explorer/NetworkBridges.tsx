import React from 'react';

import { CoinSymbol } from '../../modules/constants';
import { getCoinIcon } from '../../utils/getCoinIcon';

import { NetworkBridgesContainer } from './NetworkBridges.styles';

const dummyData = [
  { coin: CoinSymbol.BTC, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_E, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BNB, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_B, float: 24.493, vol: 232.12 },
];

const NetworkBridges = (): JSX.Element => {
  return (
    <NetworkBridgesContainer>
      <div className="title">
        <span className="Title-text">Network Bridges</span>
      </div>
      <div className="coin-container">
        {dummyData.map((coin) => {
          return (
            <div className="coin-info" key={coin.coin}>
              <img src={getCoinIcon(coin.coin)} alt={coin.coin} className="coin-image" />
              <div className="data">
                <div className="row">
                  <span>Float</span>
                  <strong>{coin.float}</strong>
                </div>
                <div className="row">
                  <span>Vol</span>
                  <span>{coin.vol}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </NetworkBridgesContainer>
  );
};

export default NetworkBridges;
