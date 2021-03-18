import { Dropdown, Tooltip } from '@swingby-protocol/pulsar';
import { estimateAmountReceiving, getMinimumWithdrawal } from '@swingby-protocol/sdk';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { useAffiliateCode } from '../../../../affiliate-code';
import { CoinSymbol } from '../../../../coins';
import { usePoolWithdrawCoin, useToggleBridge } from '../../../../hooks';
import { IWithdrawAmountValidation, TWithdrawCurrency } from '../../../../pool';
import { useSdkContext } from '../../../../sdk-context';
import { getMinimumWithdrawAmount } from '../../../../store';
import { useThemeSettings } from '../../../../store/settings';
import { ButtonScale, TextChosenFilter, TextEstimated } from '../../../Common';
import { mode, PATH } from '../.././../../env';

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
  const [themeMode] = useThemeSettings();

  const pool = useSelector((state) => state.pool);
  const { balanceSbBTC, minimumWithdrawAmount } = pool;
  const transactionFees = useSelector((state) => state.explorer.transactionFees);
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const affiliateCode = useAffiliateCode();

  const { poolCurrencies } = useToggleBridge(PATH.POOL);
  const context = useSdkContext();

  const {
    receivingAddress,
    setReceivingAddress,
    amount,
    setAmount,
    currency,
    setCurrency,
    isValidAddress,
    isValidAmount,
  } = usePoolWithdrawCoin('', 'withdrawal');

  const toCurrency = currency as TWithdrawCurrency;

  useEffect(() => {
    if (transactionFees && currency) {
      (async () => {
        const minimumWithdrawData = await getMinimumWithdrawal({
          context,
          currencyReceiving: toCurrency as TWithdrawCurrency,
          amountDesired: Number(amount) > 0 ? amount : '0',
        });

        const miniWithdrawAmount = Number(minimumWithdrawData.minimumWithdrawal);
        dispatch(getMinimumWithdrawAmount(miniWithdrawAmount));
      })();
    }
  }, [dispatch, toCurrency, transactionFees, context, amount, currency]);

  const maxAmount = balanceSbBTC;

  const withdrawMaxAmount = () => {
    if (maxAmount) {
      setAmount(String(maxAmount));
    }
  };

  const [transactionFee, setTransactionFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      Number(amount) > 0 && setIsLoading(true);
      try {
        if (cancelled) return;
        const { feeTotal } = await estimateAmountReceiving({
          context,
          currencyDeposit: CoinSymbol.ETH_SB_BTC,
          currencyReceiving: toCurrency,
          amountDesired: amount,
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
  }, [toCurrency, amount, context]);

  const currencyItems = (
    <>
      {poolCurrencies.map((currency: TWithdrawCurrency) => (
        <Dropdown.Item onClick={() => setCurrency(currency)} key={currency}>
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
    defaultCurrencyReceiving: currency as any,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: amount,
    locale,
    affiliateCode,
  });

  const isDisabled =
    0 >= Number(amount) ||
    !isValidAddress ||
    !receivingAddress ||
    amount > maxAmount ||
    minimumWithdrawAmount > amount;

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
                      <TargetCoin symbol={currency} />{' '}
                      <TextChosenFilter>{currency} </TextChosenFilter>
                    </DefaultTarget>
                  }
                  data-testid="dropdown"
                  isDarkMode={theme.pulsar.id === 'PulsarDark'}
                >
                  {currencyItems}
                </DropdownCurrency>
              </ColumnDropdown>
              <InputAmount
                value={amount}
                size="state"
                placeholder={formatMessage({ id: 'pool.withdraw.input-your-amount' })}
                onChange={(e) => setAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {amount &&
                Number(amount) !== 0 &&
                amountValidationResult({
                  isValidAmount,
                  withdrawAmount: Number(amount),
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
                  ) : Number(amount) > 0 ? (
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
