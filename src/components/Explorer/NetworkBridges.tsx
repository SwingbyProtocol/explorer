import React from 'react';
import { TitleSpan } from 'src/styles/Components/Common/customSpan';
import { customMedia } from 'src/styles/globalStyle';
import { CoinSymbol } from 'src/types';
import { getCoinIcon } from 'src/utils/getCoinIcon';
import styled from 'styled-components';

const dummyData = [
  { coin: CoinSymbol.BTC, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_E, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BNB, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_B, float: 24.493, vol: 232.12 },
];

const NetworkBridges = (): JSX.Element => {
  return (
    <NetworkBridgesContainer>
      <div className="wrapper-network-bridges">
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
      </div>
    </NetworkBridgesContainer>
  );
};

export default NetworkBridges;

const NetworkBridgesContainer = styled.div`
  .wrapper-network-bridges {
  }
  .coin-container {
    margin-top: 4rem;
    padding-right: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    ${customMedia.greaterThan('macBook13')`
      padding-left: 6%;
      padding-right: 6%;
    `}
  }

  .coin-info {
    min-width: 16rem;
    display: grid;
    grid-template-columns: 5rem auto;
    align-items: center;
    .coin-image {
      width: 4rem;
    }
    .data {
      display: grid;
      grid-row-gap: 0.4rem;
      .row {
        display: grid;
        grid-template-columns: 5rem auto;
      }
    }
  }
`;
