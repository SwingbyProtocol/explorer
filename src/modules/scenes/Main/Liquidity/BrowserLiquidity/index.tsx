import Head from 'next/head';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { liquidityModeSelector } from '../../../../store';
import { IWithdrawAmountValidation, PoolMode } from '../../../../pool';
import { ActionButtonsLiquidity } from '../ActionButtonsLiquidity';
import { AddLiquidity } from '../AddLiquidity';
import { Withdraw } from '../Withdraw';

import {
  BrowserLiquidityContainer,
  BrowserLiquidityDiv,
  TextValidationResult,
  ValidationResult,
} from './styled';

export const BrowserLiquidity = () => {
  const mode = useSelector(liquidityModeSelector);

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

  const switchComponent = (mode: string) => {
    switch (mode) {
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
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Swingby Skybridge | Liquidity</title>
      </Head>
      <BrowserLiquidityContainer>
        <BrowserLiquidityDiv size="bare">
          <ActionButtonsLiquidity />
          {switchComponent(mode)}
        </BrowserLiquidityDiv>
      </BrowserLiquidityContainer>
    </>
  );
};
