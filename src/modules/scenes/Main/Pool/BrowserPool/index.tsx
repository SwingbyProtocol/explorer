import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRecentTransaction, PoolMode } from '../../../../pool';
import { getRecentTxs } from '../../../../store';
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
  const { userAddress, mode, recentTxs } = pool;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (userAddress) {
        const histories = await fetchRecentTransaction(userAddress);
        dispatch(getRecentTxs(histories));
      }
    })();
  }, [userAddress, dispatch]);

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

    switch (mode) {
      case PoolMode.Summary:
        return summary;
      case PoolMode.AddLiquidity:
        return <AddLiquidity />;

      default:
        return summary;
    }
  };

  return (
    <>
      <Head>
        <title>Swingby Explorer | Pool</title>
      </Head>
      <BrowserPoolContainer>
        <BrowserPoolDiv size="bare">
          <Left>
            <BridgesMobile />
            <Bridges />
          </Left>
          <Right>
            {!userAddress && !recentTxs && <ConnectWallet />}
            <ActionButtonsPool />
            {switchRightComponent(mode)}
          </Right>
        </BrowserPoolDiv>
      </BrowserPoolContainer>
    </>
  );
};
