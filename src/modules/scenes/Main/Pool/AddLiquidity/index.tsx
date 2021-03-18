import { Dropdown, Tooltip } from '@swingby-protocol/pulsar';
import { estimateAmountReceiving } from '@swingby-protocol/sdk';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { useAffiliateCode } from '../../../../affiliate-code';
import { CoinSymbol, EthereumWalletAddressCoins } from '../../../../coins';
import { TCurrency } from '../../../../explorer';
import { usePoolWithdrawCoin, useToggleBridge } from '../../../../hooks';
import { IWithdrawAmountValidation } from '../../../../pool';
import { useSdkContext } from '../../../../sdk-context';
import { useThemeSettings } from '../../../../store/settings';
import { ButtonScale, TextChosenFilter, TextEstimated } from '../../../Common';
import { mode, PATH } from '../.././../../env';

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
  const { formatMessage } = useIntl();
  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;
  const { poolCurrencies } = useToggleBridge(PATH.POOL);
  const { locale } = useRouter();
  const affiliateCode = useAffiliateCode();
  const [themeMode] = useThemeSettings();
  const theme = useTheme();

  const {
    receivingAddress,
    setReceivingAddress,
    amount,
    setAmount,
    currency,
    setCurrency,
    isValidAddress,
    isValidAmount,
  } = usePoolWithdrawCoin(userAddress, 'pool');

  const currencyItems = (
    <>
      {poolCurrencies.map((currency) => (
        <Dropdown.Item onClick={() => setCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {currency}
        </Dropdown.Item>
      ))}
    </>
  );

  const receivingWalletAddress = (): string => {
    if (EthereumWalletAddressCoins.includes(currency)) {
      return userAddress;
    } else {
      return receivingAddress;
    }
  };

  const [transactionFee, setTransactionFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const context = useSdkContext();
  useEffect(() => {
    let cancelled = false;

    (async () => {
      Number(amount) > 0 && setIsLoading(true);
      try {
        if (cancelled) return;

        const { feeTotal } = await estimateAmountReceiving({
          context,
          currencyDeposit: currency as TCurrency,
          currencyReceiving: CoinSymbol.ETH_SB_BTC as TCurrency,
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
  }, [currency, amount, context]);

  const widget = createWidget({
    resource: 'pool',
    mode,
    size: 'big',
    theme: themeMode,
    defaultCurrencyDeposit: currency as any,
    defaultCurrencyReceiving: CoinSymbol.ETH_SB_BTC as any,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: amount,
    locale,
    affiliateCode,
  });

  const isDisabled =
    0 >= Number(amount) || !isValidAddress || !receivingAddress || amount[0] === '-';

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
                      <TargetCoin symbol={currency} />
                      <TextChosenFilter>{currency} </TextChosenFilter>
                    </DefaultTarget>
                  }
                  data-testid="dropdown"
                  isDarkMode={themeMode === 'dark'}
                >
                  {currencyItems}
                </DropdownCurrency>
              </ColumnDropdown>
              <InputAmount
                value={amount}
                size="state"
                placeholder={formatMessage({ id: 'pool.pool.input-your-amount' })}
                onChange={(e) => setAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {!isValidAmount && amount && amountValidationResult({ isValidAmount })}
            </AmountValidation>
          </Top>
          <Bottom>
            <InputReceivingAddress
              isEthAddress={EthereumWalletAddressCoins.includes(currency)}
              value={receivingWalletAddress()}
              size="state"
              placeholder="Input your receiving address"
              label={formatMessage({ id: 'pool.pool.receive-sbBTC-address' })}
              left={<Coin symbol={CoinSymbol.ETH_SB_BTC} />}
              onChange={(e) => {
                if (!EthereumWalletAddressCoins.includes(currency)) {
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
                  ) : amount > 0 ? (
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
