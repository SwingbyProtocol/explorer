import React from 'react';
import { useSelector } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { AccountSummary } from '../AccountSummary';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { AddLiquidity } from '../AddLiquidity';
import { Bridges } from '../Bridges';
import { BridgesMobile } from '../BridgesMobile';
import { ConnectWallet } from '../ConnectWallet';
import { EarningsChart } from '../EarningsChart';
import { TransactionsPool } from '../TransactionsPool';

import { BrowserPoolContainer, BrowserPoolDiv, Left, Right, Row } from './styled';

export const BrowserPool = () => {
  const pool = useSelector((state) => state.pool);
  const { userAddress, mode } = pool;

  const switchRightComponent = (mode: string) => {
    const summary = (
      <>
        <Row>
          <AccountSummary />
          <div />
          <EarningsChart />
        </Row>
        <TransactionsPool />
      </>
    );
    const addLiquidity = (
      <>
        <AddLiquidity />
      </>
    );
    switch (mode) {
      case PoolMode.Summary:
        return summary;
      case PoolMode.AddLiquidity:
        return addLiquidity;

      default:
        return summary;
    }
  };

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
          {switchRightComponent(mode)}
        </Right>
      </BrowserPoolDiv>
    </BrowserPoolContainer>
  );
};
