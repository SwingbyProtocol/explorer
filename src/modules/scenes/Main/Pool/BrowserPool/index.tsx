import React from 'react';

import { AccountSummary } from '../AccountSummary';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { Bridges } from '../Bridges';
import { BridgesMobile } from '../BridgesMobile';
import { EarningsChart } from '../EarningsChart';
import { TransactionsPool } from '../TransactionsPool';

import { BrowserPoolContainer, BrowserPoolDiv, Left, Right, Row } from './styled';
export const BrowserPool = () => {
  return (
    <BrowserPoolContainer>
      <BrowserPoolDiv size="bare">
        <Left>
          <BridgesMobile />
          <Bridges />
        </Left>
        <Right>
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
