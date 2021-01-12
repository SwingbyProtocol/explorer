import { Dropdown, Tooltip } from '@swingby-protocol/pulsar';
import { buildContext, estimateAmountReceiving } from '@swingby-protocol/sdk';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol, ETHCoins, PoolCurrencies } from '../../../../coins';
import { checkIsValidAddress, checkIsValidAmount, TCurrency } from '../../../../explorer';
import { IWithdrawAmountValidation } from '../../../../pool';
import { ButtonScale, TextChosenFilter, TextEstimated } from '../../../Common';
import { mode } from '../.././../../env';

import {
  AddLiquidityContainer,
  AmountValidation,
  Bottom,
  Box,
  ButtonRow,
  Coin,
  CoinDropDown,
  ColumnDropdown,
  ColumnForm,
  DefaultTarget,
  DropdownCurrency,
  InputAmount,
  InputReceivingAddress,
  RowBottom,
  RowTop,
  TargetCoin,
  TextDescription,
  TextFee,
  TextLabel,
  Top,
} from './styled';

interface Props {
  addressValidationResult: JSX.Element;
  amountValidationResult: (arg: IWithdrawAmountValidation) => JSX.Element;
}

export const AddLiquidity = (props: Props) => {
  const { addressValidationResult, amountValidationResult } = props;
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;
  const explorer = useSelector((state) => state.explorer);
  const { themeMode } = explorer;
  const { locale } = useRouter();

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [poolAmount, setPoolAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  const currencyItems = (
    <>
      {PoolCurrencies.map((currency) => (
        <Dropdown.Item onClick={() => setFromCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {currency}
        </Dropdown.Item>
      ))}
    </>
  );

  const receivingWalletAddress = (): string => {
    if (ETHCoins.includes(fromCurrency)) {
      return userAddress;
    } else {
      return receivingAddress;
    }
  };

  useEffect(() => {
    checkIsValidAddress(receivingAddress, CoinSymbol.LP, setIsValidAddress);
  }, [receivingAddress, fromCurrency]);

  useEffect(() => {
    checkIsValidAmount(poolAmount, setIsValidAmount);
  }, [poolAmount]);

  const [transactionFee, setTransactionFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;

    (async () => {
      poolAmount > 0 && setIsLoading(true);
      try {
        if (cancelled) return;

        const context = await buildContext({ mode: mode });
        const { feeTotal } = await estimateAmountReceiving({
          context,
          currencyDeposit: fromCurrency as TCurrency,
          currencyReceiving: CoinSymbol.LP as TCurrency,
          amountDesired: poolAmount,
        });
        if (cancelled) return;
        setTransactionFee(feeTotal);
      } catch (e) {
        if (cancelled) return;
        console.log(e);
        setTransactionFee('');
      }
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
      setTransactionFee('');
    };
  }, [fromCurrency, poolAmount]);

  const widget = createWidget({
    resource: 'pool',
    mode,
    size: 'big',
    theme: themeMode,
    defaultCurrencyDeposit: fromCurrency as any,
    defaultCurrencyReceiving: CoinSymbol.LP as any,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: poolAmount,
    locale,
  });

  const isDisabled =
    0 >= Number(poolAmount) || !isValidAddress || !receivingAddress || poolAmount[0] === '-';

  return (
    <AddLiquidityContainer>
      <Box>
        <ColumnForm>
          <Top>
            <RowTop>
              <ColumnDropdown>
                <TextLabel variant="label">
                  <FormattedMessage id="pool.pool.i-want-to-pool" />
                </TextLabel>
                <DropdownCurrency
                  target={
                    <DefaultTarget size="city">
                      <TargetCoin symbol={fromCurrency} />
                      <TextChosenFilter>{fromCurrency} </TextChosenFilter>
                    </DefaultTarget>
                  }
                  data-testid="dropdown"
                  isDarkMode={theme.pulsar.id === 'PulsarDark'}
                >
                  {currencyItems}
                </DropdownCurrency>
              </ColumnDropdown>
              <InputAmount
                value={poolAmount}
                size="state"
                placeholder={formatMessage({ id: 'pool.pool.input-your-amount' })}
                onChange={(e) => setPoolAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {!isValidAmount && poolAmount && amountValidationResult({ isValidAmount })}
            </AmountValidation>
          </Top>
          <Bottom>
            {/* Request: Please add `readOnly` props into TextInput component */}
            <InputReceivingAddress
              isERC20={ETHCoins.includes(fromCurrency)}
              value={receivingWalletAddress()}
              size="state"
              placeholder="Input your receiving address"
              label={formatMessage({ id: 'pool.pool.receive-sbBTC-address' })}
              left={<Coin symbol={CoinSymbol.LP} />}
              onChange={(e) => {
                if (!ETHCoins.includes(fromCurrency)) {
                  setReceivingAddress(e.target.value);
                }
              }}
            />
            {!isValidAddress && receivingAddress && addressValidationResult}
            <RowBottom>
              <div>
                <TextDescription variant="masked">
                  <FormattedMessage id="pool.withdraw.transaction-fee" />
                  &nbsp;
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        <FormattedMessage id="pool.withdraw.estimated-reason" />
                      </Tooltip.Content>
                    }
                    data-testid="tooltip"
                  >
                    {'('}
                    <TextEstimated>
                      <FormattedMessage id="pool.withdraw.estimated" />
                    </TextEstimated>
                    {')'}
                  </Tooltip>
                  <FormattedMessage id="pool.withdraw.estimated2" />
                </TextDescription>
              </div>
              <div>
                <TextFee variant="masked">
                  {isLoading ? (
                    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
                  ) : poolAmount > 0 ? (
                    transactionFee
                  ) : (
                    0
                  )}
                </TextFee>
              </div>
            </RowBottom>
            <ButtonRow>
              <ButtonScale
                variant="primary"
                size="country"
                disabled={isDisabled}
                onClick={() => openPopup({ widget })}
              >
                <FormattedMessage id="pool.pool.pool" />
              </ButtonScale>
            </ButtonRow>
          </Bottom>
        </ColumnForm>
      </Box>
    </AddLiquidityContainer>
  );
};
