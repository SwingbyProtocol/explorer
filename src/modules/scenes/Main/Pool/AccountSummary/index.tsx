import { getCryptoAssetFormatter, getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { convertFromPercent } from '../../../../common';
import {
  CONTRACT_SB_BTC,
  CONTRACT_SWAP,
  CONTRACT_WBTC,
  ENDPOINT_EARNINGS,
  etherscanApiKey,
  URL_ETHERSCAN,
  ZERO_ADDRESS,
} from '../../../../env';
import { toBTC, toSatoshi } from '../../../../explorer';
import { fetch } from '../../../../fetch';
import { ABI_SWAP, getHexValue, IFeeRate, orgFloor } from '../../../../pool';
import { getCurrentPriceSbBTC, getDepositFeeRate, setBalanceSbBTC } from '../../../../store';

import {
  AccountSummaryContainer,
  Bottom,
  Coin,
  Column,
  RowEarning,
  RowTitle,
  TextAmount,
  TextRoom,
  Top,
} from './styled';

export const AccountSummary = () => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const pool = useSelector((state) => state.pool);
  const { balanceSbBTC, web3, userAddress } = pool;

  const [claimableAmount, setClaimableAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const { locale } = useIntl();
  const currency = CoinSymbol.BTC;

  // Todo: Remove `disable-next-line` after 'earnings API' works
  // eslint-disable-next-line
  const usdTotalEarnings = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalEarnings * usd[currency]);

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale: locale,
    displaySymbol: CoinSymbol.BTC,
  }).format(Number(claimableAmount));

  useEffect(() => {
    if (web3 && userAddress) {
      (async () => {
        // const contractSbBTC = new web3.eth.Contract(ABI_TOKEN, CONTRACT_SB_BTC);
        const contractSwap = new web3.eth.Contract(ABI_SWAP, CONTRACT_SWAP);
        const urlEarning = ENDPOINT_EARNINGS;

        const handleGetDepositFeeRate = async (
          tokenAddress: string,
          totalClaimableAmount: number,
        ): Promise<number> => {
          const userFloatBal = toSatoshi(String(totalClaimableAmount));

          // Memo: When pass numAsHex to the contract method, it will be treated as uint256.
          const amountInAsHex = getHexValue(userFloatBal);
          const feeRate = await contractSwap.methods
            .getDepositFeeRate(tokenAddress, amountInAsHex)
            .call();
          return convertFromPercent(feeRate);
        };

        const getBalance = async (userAddress: string) => {
          const url = `${URL_ETHERSCAN}/api?module=account&action=tokenbalance&contractaddress=${CONTRACT_SB_BTC}&address=${userAddress}&tag=latest&apikey=${etherscanApiKey}`;
          const res = await fetch<{ result: string }>(url);
          const balance = res.ok && res.response.result;
          return Number(balance);
        };

        const results = await Promise.all([
          // contractSbBTC.methods.balanceOf(userAddress).call(),
          getBalance(userAddress),
          contractSwap.methods.getCurrentPriceLP().call(),
          fetch<{ total: string }>(urlEarning),
        ]);

        const resultBalanceOf = results[0];
        console.log('resultBalanceOf', resultBalanceOf);
        const balanceSbBTC = Number(toBTC(resultBalanceOf.toString()).toString());
        dispatch(setBalanceSbBTC(balanceSbBTC));

        // Todo: Check the logic with backend team
        const priceSbBTC = toBTC(results[1]);
        dispatch(getCurrentPriceSbBTC(priceSbBTC));

        // Todo: Check the logic with backend team
        // Memo: Decimal <= 8
        const totalClaimableAmount = orgFloor(priceSbBTC * balanceSbBTC, 8);
        setClaimableAmount(totalClaimableAmount);

        const rates = await Promise.all([
          // Memo:  ZERO_ADDRESS: BTC
          handleGetDepositFeeRate(ZERO_ADDRESS, totalClaimableAmount),
          handleGetDepositFeeRate(CONTRACT_WBTC, totalClaimableAmount),
        ]);

        const feeRates: IFeeRate = {
          BTC: rates[0],
          WBTC: rates[1],
        };
        dispatch(getDepositFeeRate(feeRates));

        // Memo: Earings API has not deployed yet. This is the mocked response.
        const totalEarnings = results[2].ok && results[2].response.total;
        setTotalEarnings(Number(totalEarnings));
      })();
    }
  }, [dispatch, web3, userAddress]);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="pool.yourAccount" />
        </Text>
      </RowTitle>
      <Column>
        <Coin symbol={currency} />
        <div>
          <Top>
            <TextRoom variant="label">
              {currency} <FormattedMessage id="pool.claim" />
            </TextRoom>
          </Top>
          <Bottom>
            <TextAmount variant="accent">{formattedClaimableAmount}</TextAmount>
          </Bottom>
        </div>
      </Column>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.balance" />
        </TextRoom>
        {/* Memo: Show number at 3 decimal */}
        <TextRoom variant="accent">{orgFloor(balanceSbBTC, 3)}</TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.totalEarnings" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {totalEarnings} {currency} */}
          <FormattedMessage id="common.comingSoon" />
        </TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.usd" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {usdTotalEarnings} */}
          <FormattedMessage id="common.comingSoon" />
        </TextRoom>
      </RowEarning>
    </AccountSummaryContainer>
  );
};
