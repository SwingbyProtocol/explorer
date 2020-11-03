import React from 'react';

import { getCoinIcon } from '../../utils/getCoinIcon';
import expend from '../../assets/icons/EXPEND.svg';
import filter from '../../assets/icons/FILTER.svg';
import swap from '../../assets/icons/SWAP.svg';
import { CoinSymbol } from '../../modules/constants';

import { TxHistoriesContainer } from './TxHistories.styles';

const TxHistories = () => {
  return (
    <TxHistoriesContainer>
      <div className="title-row">
        <div className="left">
          <span className="Title-text">Recent Swaps</span>
        </div>
        <div className="right">
          <span className="Title-text">Fees</span>
          <img src={filter} alt="filter" className="filter" />
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
            <span>1 min. ago</span>
          </div>
        </div>
        <div className="column">
          <div className="top">
            <span>From</span>
          </div>
          <div className="bottom">
            <span>To</span>
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
              <span>BTC</span>
            </div>
            <div className="bottom">
              <span className="amount-text">0.00039708</span>
            </div>
          </div>
        </div>
        <div className="column">
          <img src={swap} alt="swap" className="icon" />
        </div>
        <div className="column column-amount">
          <div className="left-column">
            <img src={getCoinIcon(CoinSymbol.BTC_B)} alt="Coin" className="coin-img" />
          </div>
          <div className="right-column">
            <div className="top">
              <span>BTC on Bnbchain</span>
            </div>
            <div className="bottom">
              <span className="amount-text">0.00039308</span>
            </div>
          </div>
        </div>
        <div />
        <div className="column">
          <span>
            <strong>0.002BTC</strong>
          </span>
        </div>
        <div className="column Pointer">
          <img src={expend} alt="expend" className="expend-icon" />
        </div>
      </div>
    </TxHistoriesContainer>
  );
};

export default TxHistories;
