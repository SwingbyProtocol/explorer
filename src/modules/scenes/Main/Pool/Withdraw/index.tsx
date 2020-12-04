import { Button, Dropdown } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { CoinSymbol, PoolCurrencies } from '../../../../coins';
import { calculateDepositFee } from '../../../../pool';

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
  RowBottom,
  RowText,
  RowTop,
  TargetCoin,
  TextDescription,
  TextFee,
  TextLabel,
  Top,
  WithdrawContainer,
} from './styled';

export const Withdraw = () => {
  const theme = useTheme();
  const [receivingAddress, setReceivingAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);

  const withdrawRate = 0.25;

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
                value={withdrawAmount}
                size="state"
                placeholder="Input your withdraw amount"
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </RowTop>
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
            <RowBottom>
              <div className="left">
                <RowText>
                  <TextDescription variant="masked">BTC Transaction Fee:</TextDescription>
                </RowText>
                {/* Todo: Check specification */}
                <TextDescription variant="masked">Withdraw Fee ({withdrawRate}%):</TextDescription>
              </div>
              <div className="right">
                <RowText>
                  <TextFee variant="masked">0.000023</TextFee>
                </RowText>
                <TextFee variant="masked">
                  {calculateDepositFee(withdrawRate, withdrawAmount)}
                </TextFee>
              </div>
            </RowBottom>
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
