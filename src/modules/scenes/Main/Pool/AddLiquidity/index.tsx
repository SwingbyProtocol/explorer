import { Dropdown } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { CoinSymbol, ETHCoins, PoolCurrencies } from '../../../../coins';
import { checkIsValidAddress, checkIsValidAmount } from '../../../../explorer';
import { calculateDepositFee } from '../../../../pool';
import { ButtonScale } from '../../../Common';
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
  amountValidationResult: JSX.Element;
}

export const AddLiquidity = (props: Props) => {
  const { addressValidationResult, amountValidationResult } = props;
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const pool = useSelector((state) => state.pool);
  const { userAddress, depositFeeRate } = pool;
  const explorer = useSelector((state) => state.explorer);
  const { themeMode } = explorer;

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [poolAmount, setPoolAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  const depositRate = depositFeeRate && depositFeeRate;

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

  const widget = createWidget({
    resource: 'pool',
    mode,
    size: 'big',
    theme: themeMode,
    defaultCurrencyDeposit: fromCurrency as any,
    defaultCurrencyReceiving: CoinSymbol.LP as any,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: poolAmount,
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
                  <FormattedMessage id="pool.pool.iWantToPool" />
                </TextLabel>
                <DropdownCurrency
                  target={
                    <DefaultTarget size="city">
                      <TargetCoin symbol={fromCurrency} /> {fromCurrency}
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
                placeholder={formatMessage({ id: 'pool.pool.inputYourAmount' })}
                onChange={(e) => setPoolAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {!isValidAmount && poolAmount && amountValidationResult}
            </AmountValidation>
          </Top>
          <Bottom>
            {/* Request: Please add `readOnly` props into TextInput component */}
            <InputReceivingAddress
              isERC20={ETHCoins.includes(fromCurrency)}
              value={receivingWalletAddress()}
              size="state"
              placeholder="Input your receiving address"
              label={formatMessage({ id: 'pool.pool.receiveSbBTCAddress' })}
              left={<Coin symbol={CoinSymbol.LP} />}
              onChange={(e) => {
                if (!ETHCoins.includes(fromCurrency)) {
                  setReceivingAddress(e.target.value);
                }
              }}
            />
            {!isValidAddress && receivingAddress && addressValidationResult}
            <RowBottom>
              <div className="left">
                <TextDescription variant="masked">
                  <FormattedMessage id="pool.pool.depositFee" />({depositRate[fromCurrency]}%):
                </TextDescription>
              </div>
              <div className="right">
                <TextFee variant="masked">
                  {poolAmount >= 0 && calculateDepositFee(depositRate[fromCurrency], poolAmount)}
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
