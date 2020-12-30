import { Dropdown, Tooltip } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { CoinSymbol, PoolCurrencies } from '../../../../coins';
import { convertFromPercent } from '../../../../common';
import {
  calculateFixedFee,
  checkIsValidAddress,
  checkIsValidAmount,
  toBTC,
  toSatoshi,
} from '../../../../explorer';
import { ABI_SWAP, IWithdrawAmountValidation, orgFloor } from '../../../../pool';
import { getMinimumWithdrawAmount, getWithdrawRate } from '../../../../store';
import { ButtonScale } from '../../../Common';
import { CONTRACT_SWAP, mode } from '../.././../../env';

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
  TextEstimated,
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
  const { balanceSbBTC, web3, withdrawRate, minimumWithdrawAmount } = pool;
  const explorer = useSelector((state) => state.explorer);
  const { themeMode, transactionFees } = explorer;
  const { locale } = useRouter();
  const dispatch = useDispatch();

  const [receivingAddress, setReceivingAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [toCurrency, setToCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  useEffect(() => {
    checkIsValidAddress(receivingAddress, toCurrency, setIsValidAddress);
  }, [receivingAddress, toCurrency]);

  useEffect(() => {
    checkIsValidAmount(withdrawAmount, setIsValidAmount);
  }, [withdrawAmount]);

  useEffect(() => {
    if (web3 && transactionFees && toCurrency) {
      (async () => {
        const contractSwap = new web3.eth.Contract(ABI_SWAP, CONTRACT_SWAP);

        const fixedFee = calculateFixedFee(toCurrency, transactionFees).fixedFee;
        const fixedFeeSatoshi = toSatoshi(String(fixedFee));

        const results = await Promise.all([
          contractSwap.methods.withdrawalFeeBPS().call(),
          contractSwap.methods.getMinimumAmountOfLPTokens(fixedFeeSatoshi).call(),
        ]);
        const withdrawRatePercent = convertFromPercent(Number(results[0]));
        dispatch(getWithdrawRate(withdrawRatePercent));

        const miniWithdrawAmount = toBTC(results[1][0]);
        dispatch(getMinimumWithdrawAmount(miniWithdrawAmount));
      })();
    }
  }, [dispatch, web3, toCurrency, transactionFees]);

  const maxAmount = balanceSbBTC;

  const withdrawMaxAmount = () => {
    if (maxAmount) {
      setWithdrawAmount(String(maxAmount));
    }
  };

  const minerFee = withdrawAmount ? calculateFixedFee(toCurrency, transactionFees).fixedFee : 0;

  const currencyItems = (
    <>
      {PoolCurrencies.map((currency) => (
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
                  <FormattedMessage id="pool.withdraw.iWantToWithdraw" />
                </TextLabel>
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
                placeholder={formatMessage({ id: 'pool.withdraw.inputYourAmount' })}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </RowTop>
            <AmountValidation>
              {withdrawAmount &&
                Number(withdrawAmount) !== 0 &&
                amountValidationResult({
                  isValidAmount,
                  withdrawAmount,
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
              placeholder={formatMessage({ id: 'pool.pool.inputYourAddress' })}
              label={formatMessage({
                id:
                  toCurrency === CoinSymbol.BTC
                    ? 'pool.withdraw.receiveBTCAddress'
                    : 'pool.withdraw.receiveWBTCAddress',
              })}
              left={<Coin symbol={toCurrency} />}
              onChange={(e) => setReceivingAddress(e.target.value)}
            />
            {!isValidAddress && receivingAddress && addressValidationResult}

            <RowBottom>
              <div className="left">
                <TextDescription variant="masked">
                  <FormattedMessage id="pool.withdraw.transactionFee" />
                  &nbsp;
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        <FormattedMessage id="pool.withdraw.estimatedReason" />
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
              <div className="right">
                <TextFee variant="masked">
                  {withdrawAmount >= 0 &&
                    orgFloor(withdrawAmount * convertFromPercent(withdrawRate) + minerFee, 8)}
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
