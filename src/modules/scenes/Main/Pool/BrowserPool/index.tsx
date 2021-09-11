import Head from 'next/head';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { useOnboard } from '../../../../onboard';
import { IWithdrawAmountValidation, PoolMode } from '../../../../pool';
import { ActionButtonsPool } from '../ActionButtonsPool';
import { AddLiquidity } from '../AddLiquidity';
import { Bridges } from '../Bridges';
import { BridgesMobile } from '../BridgesMobile';
import { ConnectWallet } from '../ConnectWallet';
import { EarningsChart } from '../EarningsChart';
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
} from './styled';

export const BrowserPool = () => {
  const mode = useSelector((state) => state.pool.mode);
  const { address } = useOnboard();

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
          {/* <AccountSummary /> */}
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
            <ActionButtonsPool />
            {switchRightComponent(mode)}
          </Right>
        </BrowserPoolDiv>
      </BrowserPoolContainer>
    </>
  );
};
