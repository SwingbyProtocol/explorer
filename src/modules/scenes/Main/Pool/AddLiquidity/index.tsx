import { Dropdown } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';

import { CoinSymbol, PoolCurrencies } from '../../../../coins';

import {
  AddLiquidityContainer,
  Bottom,
  ColumnForm,
  ColumnDropdown,
  DefaultTarget,
  DropdownCurrency,
  InputReceivingAddress,
  Row,
  CoinDropDown,
  TextLabel,
  Top,
  TargetCoin,
  Coin,
  InputAmount,
} from './styled';

export const AddLiquidity = () => {
  const [receivingAddress, setReceivingAddress] = useState('');
  const [poolAmount, setPoolAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(CoinSymbol.BTC);

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
      <ColumnForm>
        <Top>
          <Row>
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
          </Row>
        </Top>
        <Bottom>
          <InputReceivingAddress
            value={receivingAddress}
            size="state"
            placeholder="Input your receiving address"
            label="Receiving Address"
            left={<Coin symbol={CoinSymbol.BTC_E} />}
            onChange={(e) => setReceivingAddress(e.target.value)}
          />
        </Bottom>
      </ColumnForm>
    </AddLiquidityContainer>
  );
};
