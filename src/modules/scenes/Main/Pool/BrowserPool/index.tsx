import React from 'react';
import { useSelector } from 'react-redux';

import { AccountSummary } from '../AccountSummary';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { Bridges } from '../Bridges';
import { BridgesMobile } from '../BridgesMobile';
import { ConnectWallet } from '../ConnectWallet';
import { EarningsChart } from '../EarningsChart';
import { TransactionsPool } from '../TransactionsPool';

import { BrowserPoolContainer, BrowserPoolDiv, Left, Right, Row } from './styled';
export const BrowserPool = () => {
  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;
  return (
    <BrowserPoolContainer>
      <BrowserPoolDiv size="bare">
        <Left>
          <BridgesMobile />
          <Bridges />
        </Left>
        <Right>
          {!userAddress && <ConnectWallet />}
          <ActionButtonsPool />
          <Row>
            <AccountSummary />
            <div />
            <EarningsChart />
          </Row>
          <TransactionsPool />
        </Right>
      </BrowserPoolDiv>
    </BrowserPoolContainer>
  );
};
