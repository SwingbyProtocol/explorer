import Head from 'next/head';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { LOCAL_STORAGE, PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { useOnboard } from '../../../../onboard';
import { IWithdrawAmountValidation, PoolMode } from '../../../../pool';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { AddLiquidity } from '../AddLiquidity';
import { Bridges } from '../Bridges';
import { BridgesMobile } from '../BridgesMobile';
import { ConnectWallet } from '../ConnectWallet';
import { EarningStats } from '../EarningStats';
import { FarmCard } from '../FarmCard';
import { TransactionsPool } from '../TransactionsPool';
import { Withdraw } from '../Withdraw';

import {
  BrowserPoolContainer,
  BrowserPoolDiv,
  Left,
  Right,
  Row,
  TextValidationResult,
  ValidationResult,
  BackDropMobile,
} from './styled';
import { poolModeSelector } from '../../../../store';

export const BrowserPool = () => {
  const mode = useSelector(poolModeSelector);
  const { address, wallet, onboard } = useOnboard();
  const storedWallet = localStorage.getItem(LOCAL_STORAGE.Wallet);
  const { bridge } = useToggleBridge(PATH.POOL);

  useEffect(() => {
    const unableStoreWallets = ['WalletConnect'];
    if (!wallet || unableStoreWallets.find((name) => name === wallet.name)) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE.Wallet, wallet.name);
  }, [wallet]);

  useEffect(() => {
    if (!onboard || !storedWallet || !bridge) return;
    (async () => {
      await onboard.walletSelect(storedWallet);
      if (!(await onboard.walletCheck())) {
        throw Error('Wallet check result is invalid');
      }
    })();
  }, [onboard, storedWallet, bridge]);

  const addressValidationResult = (
    <ValidationResult>
      <TextValidationResult variant="normal">
        <FormattedMessage id="validation.invalid-address" />
      </TextValidationResult>
    </ValidationResult>
  );

  const amountValidationResult = (data: IWithdrawAmountValidation): JSX.Element => {
    const { isValidAmount, withdrawAmount, maxAmount, minimumWithdrawAmount, toCurrency } = data;
    const failedFormat = () => {
      if (!isValidAmount) {
        return <FormattedMessage id="validation.pls-input-number-only" />;
      }
      if (withdrawAmount > maxAmount) {
        return <FormattedMessage id="validation.insufficient-balance" />;
      }
      if (minimumWithdrawAmount > withdrawAmount) {
        return (
          <FormattedMessage
            id="validation.lower-than-minimum-amount"
            values={{ value: minimumWithdrawAmount, currency: toCurrency }}
          />
        );
      }
    };
    return (
      <ValidationResult>
        <TextValidationResult variant="normal">{failedFormat()}</TextValidationResult>
      </ValidationResult>
    );
  };

  const switchRightComponent = (mode: string) => {
    const summary = (
      <>
        <Row>
          <FarmCard />
          <div />
          <EarningStats />
        </Row>
        <TransactionsPool />
      </>
    );

    switch (mode) {
      case PoolMode.Summary:
        return summary;
      case PoolMode.AddLiquidity:
        return (
          <AddLiquidity
            addressValidationResult={addressValidationResult}
            amountValidationResult={amountValidationResult}
          />
        );
      case PoolMode.Withdraw:
        return (
          <Withdraw
            addressValidationResult={addressValidationResult}
            amountValidationResult={amountValidationResult}
          />
        );

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
            {!address && <ConnectWallet />}
            {!address && <BackDropMobile />}
            <ActionButtonsPool />
            {switchRightComponent(mode)}
          </Right>
        </BrowserPoolDiv>
      </BrowserPoolContainer>
    </>
  );
};
