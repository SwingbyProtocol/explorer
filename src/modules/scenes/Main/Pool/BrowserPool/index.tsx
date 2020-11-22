import React from 'react';

import { AccountSummary } from '../AccountSummary';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { Bridges } from '../Bridges';
import { EarningsChart } from '../EarningsChart';
import { TransactionsPool } from '../TransactionsPool';

import { BrowserPoolContainer, BrowserPoolDiv, Left, Right, Row } from './styled';
export const BrowserPool = () => {
  return (
    <BrowserPoolContainer>
      <BrowserPoolDiv size="bare">
        <Left>
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
