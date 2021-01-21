import { Dropdown, Tooltip } from '@swingby-protocol/pulsar';
import { estimateAmountReceiving, getMinimumWithdrawal } from '@swingby-protocol/sdk';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol, PoolCurrencies } from '../../../../coins';
import { convertFromPercent } from '../../../../common';
import { checkIsValidAddress, checkIsValidAmount, TCurrency } from '../../../../explorer';
import { IWithdrawAmountValidation, TWithdrawCurrency } from '../../../../pool';
import { useSdkContext } from '../../../../sdk-context';
import { getMinimumWithdrawAmount, getWithdrawRate } from '../../../../store';
import { ButtonScale, TextChosenFilter, TextEstimated } from '../../../Common';
import { mode } from '../.././../../env';

import {
  AllButtonDiv,
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
  TextAll,
  TextDescription,
  TextFee,
  TextLabel,
  Top,
  WithdrawContainer,
} from './styled';

interface Props {
  addressValidationResult: JSX.Element;
  amountValidationResult: (arg: IWithdrawAmountValidation) => JSX.Element;
}

export const Withdraw = (props: Props) => {
  const { addressValidationResult, amountValidationResult } = props;
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const pool = useSelector((state) => state.pool);
  const { balanceSbBTC, web3, minimumWithdrawAmount } = pool;
  const explorer = useSelector((state) => state.explorer);
  const { themeMode, transactionFees } = explorer;
  const { locale } = useRouter();
  const dispatch = useDispatch();

  const [receivingAddress, setReceivingAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('0');
  const [toCurrency, setToCurrency] = useState<TWithdrawCurrency>('BTC');
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);
  const context = useSdkContext();

  useEffect(() => {
    checkIsValidAddress(receivingAddress, toCurrency, setIsValidAddress);
  }, [receivingAddress, toCurrency]);

  useEffect(() => {
    checkIsValidAmount(withdrawAmount, setIsValidAmount);
  }, [withdrawAmount]);

  useEffect(() => {
    if (web3 && transactionFees && toCurrency) {
      (async () => {
        // const results = await Promise.all([
        //   // web3.methods.withdrawalFeeBPS().call(),
        //   getMinimumWithdrawal({
        //     context,
        //     currencyReceiving: toCurrency,
        //     amountDesired: Number(withdrawAmount) > 0 ? withdrawAmount : '0',
        //   }),
        // ]);
        const withdrawRatePercent = 0;
        // const withdrawRatePercent = convertFromPercent(Number(results[0]));
        dispatch(getWithdrawRate(withdrawRatePercent));

        const miniWithdrawAmount = 0;
        // const miniWithdrawAmount = Number(results[0].minimumWithdrawal);
        dispatch(getMinimumWithdrawAmount(miniWithdrawAmount));
      })();
    }
  }, [dispatch, web3, toCurrency, transactionFees, context, withdrawAmount]);

  const maxAmount = balanceSbBTC;

  const withdrawMaxAmount = () => {
    if (maxAmount) {
      setWithdrawAmount(String(maxAmount));
    }
  };

  const [transactionFee, setTransactionFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      Number(withdrawAmount) > 0 && setIsLoading(true);
      try {
        if (cancelled) return;
        const { feeTotal } = await estimateAmountReceiving({
          context,
          currencyDeposit: CoinSymbol.LP as TCurrency,
          currencyReceiving: toCurrency as TCurrency,
          amountDesired: withdrawAmount,
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
  }, [toCurrency, withdrawAmount, context]);

  const currencyItems = (
    <>
      {PoolCurrencies.map((currency: TWithdrawCurrency) => (
        <Dropdown.Item onClick={() => setToCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {currency}
        </Dropdown.Item>
      ))}
    </>
  );

  const widget = createWidget({
    resource: 'withdrawal',
    mode,
    size: 'big',
    theme: themeMode,
    defaultCurrencyReceiving: toCurrency as any,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: withdrawAmount,
    locale,
  });

  const isDisabled =
    0 >= Number(withdrawAmount) ||
    !isValidAddress ||
    !receivingAddress ||
    withdrawAmount > maxAmount ||
    minimumWithdrawAmount > withdrawAmount;

  return (
    <WithdrawContainer>
      <Box>
        <ColumnForm>
          <Top>
            <RowTop>
              <ColumnDropdown>
                <TextLabel variant="label">
                  <FormattedMessage id="pool.withdraw.i-want-to-withdraw" />
                </TextLabel>
                <DropdownCurrency
                  target={
                    <DefaultTarget size="city">
                      {' '}
                      <TargetCoin symbol={toCurrency} />{' '}
                      <TextChosenFilter>{toCurrency} </TextChosenFilter>
                    </DefaultTarget>
                  }
                  data-testid="dropdown"
                  isDarkMode={theme.pulsar.id === 'PulsarDark'}
                >
                  {currencyItems}
                </DropdownCurrency>
              </ColumnDropdown>
              <InputAmount
                value={withdrawAmount}
                size="state"
                placeholder={formatMessage({ id: 'pool.withdraw.input-your-amount' })}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {withdrawAmount &&
                Number(withdrawAmount) !== 0 &&
                amountValidationResult({
                  isValidAmount,
                  withdrawAmount: Number(withdrawAmount),
                  maxAmount,
                  minimumWithdrawAmount,
                  toCurrency,
                })}
              <AllButtonDiv>
                <TextAll variant="accent" onClick={() => withdrawMaxAmount()}>
                  <FormattedMessage id="pool.withdraw.max" />
                </TextAll>
              </AllButtonDiv>
            </AmountValidation>
          </Top>
          <Bottom>
            <InputReceivingAddress
              value={receivingAddress}
              size="state"
              placeholder={formatMessage({ id: 'pool.pool.input-your-address' })}
              label={formatMessage({
                id:
                  toCurrency === CoinSymbol.BTC
                    ? 'pool.withdraw.receive-BTC-address'
                    : 'pool.withdraw.receive-WBTC-address',
              })}
              left={<Coin symbol={toCurrency} />}
              onChange={(e) => setReceivingAddress(e.target.value)}
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
                  ) : Number(withdrawAmount) > 0 ? (
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
                <FormattedMessage id="pool.withdraw" />
              </ButtonScale>
            </ButtonRow>
          </Bottom>
        </ColumnForm>
      </Box>
    </WithdrawContainer>
  );
};
