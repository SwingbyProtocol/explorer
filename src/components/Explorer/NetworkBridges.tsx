import React from 'react';

import { CoinSymbol } from '../../modules/constants';
import { getCoinIcon } from '../../modules/explorer';
import { DescribeSpan } from '../DescribeSpan';
import { TitleSpan } from '../TitleSpan';

import { NetworkBridgesContainer } from './NetworkBridges.stylesd';

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
        <TitleSpan>Network Bridges</TitleSpan>
      </div>
      <div className="coin-container">
        {dummyData.map((coin) => {
          return (
            <div className="coin-info" key={coin.coin}>
              <img src={getCoinIcon(coin.coin)} alt={coin.coin} className="coin-image" />
              <div className="data">
                <div className="row">
                  <DescribeSpan>Float</DescribeSpan>
                  <strong className="amount-text">{coin.float}</strong>
                </div>
                <div className="row">
                  <DescribeSpan>Vol</DescribeSpan>
                  <span className="amount-text">{coin.vol}</span>
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
