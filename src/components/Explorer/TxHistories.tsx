import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

import { CoinSymbol } from '../../modules/constants';
import { getCoinIcon } from '../../utils/getCoinIcon';
import { DescribeSpan, TitleSpan } from '../customSpan.styles';

import { TxHistoriesContainer } from './TxHistories.styles';

const TxHistories = () => {
  return (
    <TxHistoriesContainer>
      <div className="title-row">
        <div className="left">
          <TitleSpan>Recent Swaps</TitleSpan>
        </div>
        <div className="right">
          <TitleSpan>Fees</TitleSpan>
          <Icon.Filter className="filter" />
        </div>
      </div>
      <div className="tx-history-row">
        <div className="column">
          <div className="status">
            {/* Todo: Add circle icon */}
            {/* <Icon name="circle" className="circle" /> */}
            <span className="status-text">Waiting</span>
          </div>
          <div className="bottom">
            <span className="time-past-text">1 min. ago</span>
          </div>
        </div>
        <div className="column">
          <div className="top">
            <DescribeSpan>From</DescribeSpan>
          </div>
          <div className="bottom">
            <DescribeSpan>To</DescribeSpan>
          </div>
        </div>
        <div className="column">
          <div className="top">
            <p className="address-text">tb1qcpkanu748ud8gs736nxvqqjn5d7q4pj5mhnnyp</p>
          </div>
          <div className="bottom">
            <p className="address-text">tbnb1lpq6tp2p72js9jjfk7ux8g2qjpm5udzpy4h7k5</p>
          </div>
        </div>
        <div className="column column-amount">
          <div className="left-column">
            <img src={getCoinIcon(CoinSymbol.BTC)} alt="Coin" className="coin-img" />
          </div>
          <div className="right-column">
            <div className="top">
              <DescribeSpan>BTC</DescribeSpan>
            </div>
            <div className="bottom">
              <span className="amount-text">0.00039708</span>
            </div>
          </div>
        </div>
        <div className="column">
          <Icon.SwapHorizontal className="swap-icon" />
        </div>
        <div className="column column-amount">
          <div className="left-column">
            <img src={getCoinIcon(CoinSymbol.BTC_B)} alt="Coin" className="coin-img" />
          </div>
          <div className="right-column">
            <div className="top">
              <DescribeSpan>BTC on Bnbchain</DescribeSpan>
            </div>
            <div className="bottom">
              <span className="amount-text">0.00039308</span>
            </div>
          </div>
        </div>
        <div />
        <div className="column">
          <DescribeSpan>
            <strong>0.002BTC</strong>
          </DescribeSpan>
        </div>
        <div className="column Pointer">
          <Icon.Ellipsis className="ellipsis-icon" />
        </div>
      </div>
    </TxHistoriesContainer>
  );
};

export default TxHistories;
