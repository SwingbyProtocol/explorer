import { Dropdown, Icon } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { useAffiliateCode } from '../../../../affiliate-code';
import {
  CoinSymbol,
  EthereumWalletAddressCoins,
  getBridgeSbBtc,
  TBtcCurrency,
  TSbBTC,
  swingbyTextDisplay,
} from '../../../../coins';
import { useGetPoolApr, usePoolWithdrawCoin, useToggleBridge } from '../../../../hooks';
import { useOnboard } from '../../../../onboard';
import { IWithdrawAmountValidation } from '../../../../pool';
import { useThemeSettings } from '../../../../store/settings';
import { ButtonScale, TextChosenFilter } from '../../../Common';
import { mode, PATH } from '../../../../env';
import { URL } from '../../../../links';

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
  RowTop,
  TargetCoin,
  TextLabel,
  Top,
  AllButtonDiv,
  TextAll,
  LiquidityInfoContainer,
  LiquidityInfo,
  CoinInfoContainer,
  CoinInfo,
  CoinInfoIcon,
  CoinName,
  LiquidityAPR,
  LiquidityAPRValue,
  LiquidityStatInfo,
  LiquidityHelpLink,
} from './styled';

interface Props {
  addressValidationResult: JSX.Element;
  amountValidationResult: (arg: IWithdrawAmountValidation) => JSX.Element;
}

export const AddLiquidity = (props: Props) => {
  const { addressValidationResult, amountValidationResult } = props;
  const { formatMessage } = useIntl();
  const { address } = useOnboard();
  const { poolCurrencies, bridge } = useToggleBridge(PATH.LIQUIDITY);
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
    peggedBtcUserBal,
  } = usePoolWithdrawCoin(address, 'pool');

  const currencyItems = (
    <>
      {poolCurrencies.map((currency: CoinSymbol) => (
        <Dropdown.Item onClick={() => setCurrency(currency)} key={currency}>
          {<CoinDropDown symbol={currency} />} {swingbyTextDisplay(currency)}
        </Dropdown.Item>
      ))}
    </>
  );

  const receivingWalletAddress = (): string => {
    if (EthereumWalletAddressCoins.includes(currency)) {
      return address;
    } else {
      return receivingAddress;
    }
  };

  const sbBTC = getBridgeSbBtc(bridge);

  const widget = createWidget({
    resource: 'pool',
    mode,
    size: 'big',
    theme: themeMode,
    defaultCurrencyDeposit: currency as TBtcCurrency,
    defaultCurrencyReceiving: sbBTC as TSbBTC,
    defaultAddressReceiving: receivingAddress,
    defaultAmountDesired: amount,
    locale,
    affiliateCode,
  });

  const { apr, isLoading: aprLoading } = useGetPoolApr();

  const isDisabled =
    0 >= Number(amount) || !isValidAddress || !receivingAddress || amount[0] === '-';

  return (
    <AddLiquidityContainer>
      <LiquidityInfoContainer>
        <LiquidityInfo>
          <CoinInfoContainer>
            <CoinInfo>
              <CoinInfoIcon symbol={CoinSymbol.BTC} />
              <CoinName>BTC</CoinName>
            </CoinInfo>

            <div style={{ paddingLeft: 30 }}>or</div>

            <CoinInfo>
              <CoinInfoIcon symbol={CoinSymbol.SKYPOOL_WBTC} />
              <CoinName>WBTC</CoinName>
            </CoinInfo>
          </CoinInfoContainer>

          <Icon.ArrowRight />

          <CoinInfoContainer>
            <CoinInfo>
              <CoinInfoIcon symbol={CoinSymbol.SKYPOOL_SB_BTC} />
              <CoinName>sbBTC (ERC20)</CoinName>
            </CoinInfo>
          </CoinInfoContainer>

          <LiquidityAPR>
            <FormattedMessage id="liquidity.current-apr-label" />
            {aprLoading ? (
              <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
            ) : (
              <a href="https://dune.com/swingby/skybridge" target="_blank" rel="noreferrer">
                <LiquidityAPRValue>
                  <FormattedNumber
                    value={bridge && apr[bridge].total}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                  %
                </LiquidityAPRValue>
              </a>
            )}
          </LiquidityAPR>
        </LiquidityInfo>

        <LiquidityStatInfo>
          <Icon.InfoCircle />
          <LiquidityHelpLink href={URL.BecomeLiquidityProvider} target="_blank">
            <FormattedMessage id="liquidity.help-url" />
          </LiquidityHelpLink>
        </LiquidityStatInfo>
      </LiquidityInfoContainer>

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
                      <TextChosenFilter>{swingbyTextDisplay(currency)} </TextChosenFilter>
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
              <AllButtonDiv currency={currency}>
                <TextAll variant="accent" onClick={() => setAmount(String(peggedBtcUserBal))}>
                  <FormattedMessage id="pool.withdraw.max" />
                </TextAll>
              </AllButtonDiv>
            </AmountValidation>
          </Top>
          <Bottom>
            <InputReceivingAddress
              isEthAddress={EthereumWalletAddressCoins.includes(currency)}
              value={receivingWalletAddress()}
              size="state"
              placeholder="Input your receiving address"
              label={formatMessage(
                {
                  id: 'pool.receive-address',
                },
                { value: 'sbBTC' },
              )}
              left={<Coin symbol={sbBTC} />}
              onChange={(e) => {
                if (!EthereumWalletAddressCoins.includes(currency)) {
                  setReceivingAddress(e.target.value);
                }
              }}
            />
            {!isValidAddress && receivingAddress && addressValidationResult}
            <ButtonRow>
              <ButtonScale
                variant="primary"
                size="country"
                disabled={isDisabled}
                onClick={() => openPopup({ widget })}
              >
                <FormattedMessage id="pool.pool.deposit" />
              </ButtonScale>
            </ButtonRow>
          </Bottom>
        </ColumnForm>
      </Box>
    </AddLiquidityContainer>
  );
};
