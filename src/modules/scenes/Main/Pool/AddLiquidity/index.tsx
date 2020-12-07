import { Button, Dropdown } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { CoinSymbol, ETHCoins, PoolCurrencies } from '../../../../coins';
import { calculateDepositFee, calculateReceivingAmount } from '../../../../pool';

import {
  AddLiquidityContainer,
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
  RowText,
  RowTop,
  TargetCoin,
  TextDescription,
  TextFee,
  TextLabel,
  Top,
} from './styled';

export const AddLiquidity = () => {
  const theme = useTheme();
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [poolAmount, setPoolAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);

  const depositRate = 0.25;

  const estimatedReceivingAmount = calculateReceivingAmount(
    poolAmount,
    fromCurrency,
    transactionFees,
  );
  const transactionFee = poolAmount
    ? Number((poolAmount - estimatedReceivingAmount).toFixed(7))
    : 0;

  const currencyItems = (
    <>
      {PoolCurrencies.map((currency) => (
        <Dropdown.Item onClick={() => setFromCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {currency}
        </Dropdown.Item>
      ))}
    </>
  );

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
          </Top>
          <Bottom>
            {/* Request: Please add `readOnly` props into TextInput component */}
            <InputReceivingAddress
              isERC20={ETHCoins.includes(fromCurrency)}
              value={receivingAddress}
              size="state"
              placeholder="Input your receiving address"
              label="And receive my LPT’s to:"
              left={<Coin symbol={CoinSymbol.BTC_E} />}
              onChange={(e) => {
                if (ETHCoins.includes(fromCurrency)) {
                  setReceivingAddress(userAddress);
                } else {
                  setReceivingAddress(e.target.value);
                }
              }}
            />
            <RowBottom>
              <div className="left">
                <RowText>
                  <TextDescription variant="masked">BTC Transaction Fee:</TextDescription>
                </RowText>
                <TextDescription variant="masked">Deposit Fee ({depositRate}%):</TextDescription>
              </div>
              <div className="right">
                <RowText>
                  <TextFee variant="masked">{transactionFee}</TextFee>
                </RowText>
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
