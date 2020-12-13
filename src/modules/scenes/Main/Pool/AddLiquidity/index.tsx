import { Button, Dropdown } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { CoinSymbol, ETHCoins, PoolCurrencies } from '../../../../coins';
import { checkIsValidAddress, checkIsValidAmount } from '../../../../explorer';
import { calculateDepositFee } from '../../../../pool';

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
  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [poolAmount, setPoolAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  const depositRate = 0.25;

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

  return (
    <AddLiquidityContainer>
      <Box>
        <ColumnForm>
          <Top>
            <RowTop>
              <ColumnDropdown>
                <TextLabel variant="label">I Want to Pool</TextLabel>
                <DropdownCurrency
                  target={
                    <DefaultTarget size="city">
                      {' '}
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
                placeholder="Input your pool amount"
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
              label="And receive my sbBTC to:"
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
                <TextDescription variant="masked">Deposit Fee ({depositRate}%):</TextDescription>
              </div>
              <div className="right">
                <TextFee variant="masked">{calculateDepositFee(depositRate, poolAmount)}</TextFee>
              </div>
            </RowBottom>
            <ButtonRow>
              <Button variant="primary" size="country">
                Pool
              </Button>
            </ButtonRow>
          </Bottom>
        </ColumnForm>
      </Box>
    </AddLiquidityContainer>
  );
};
