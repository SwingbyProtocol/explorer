import { Button, Dropdown } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { CoinSymbol, PoolCurrencies } from '../../../../coins';
import { checkIsValidAddress, checkIsValidAmount } from '../../../../explorer';

import {
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
  RowTop,
  TargetCoin,
  AmountValidation,
  TextLabel,
  Top,
  WithdrawContainer,
} from './styled';

interface Props {
  addressValidationResult: JSX.Element;
  amountValidationResult: JSX.Element;
}

export const Withdraw = (props: Props) => {
  const { addressValidationResult, amountValidationResult } = props;
  const theme = useTheme();

  const [receivingAddress, setReceivingAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [toCurrency, setToCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  useEffect(() => {
    checkIsValidAddress(receivingAddress, toCurrency, setIsValidAddress);
  }, [receivingAddress, toCurrency]);

  useEffect(() => {
    console.log(withdrawAmount);
    checkIsValidAmount(withdrawAmount, setIsValidAmount);
  }, [withdrawAmount]);

  const currencyItems = (
    <>
      {PoolCurrencies.map((currency) => (
        <Dropdown.Item onClick={() => setToCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {currency}
        </Dropdown.Item>
      ))}
    </>
  );

  return (
    <WithdrawContainer>
      <Box>
        <ColumnForm>
          <Top>
            <RowTop>
              <ColumnDropdown>
                <TextLabel variant="label">I Want to Withdraw</TextLabel>
                <DropdownCurrency
                  target={
                    <DefaultTarget size="city">
                      {' '}
                      <TargetCoin symbol={toCurrency} /> {toCurrency}
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
                placeholder="Input your withdraw amount"
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {!isValidAmount && withdrawAmount && amountValidationResult}
            </AmountValidation>
          </Top>
          <Bottom>
            <InputReceivingAddress
              value={receivingAddress}
              size="state"
              placeholder="Input your receiving address"
              label="And receive my BTC to:"
              left={<Coin symbol={CoinSymbol.BTC} />}
              onChange={(e) => setReceivingAddress(e.target.value)}
            />
            {!isValidAddress && receivingAddress && addressValidationResult}

            <ButtonRow>
              <Button variant="primary" size="country">
                Withdraw
              </Button>
            </ButtonRow>
          </Bottom>
        </ColumnForm>
      </Box>
    </WithdrawContainer>
  );
};
