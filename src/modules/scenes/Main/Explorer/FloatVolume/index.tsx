import { Text } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { mode, URL_BSCSCAN, URL_ETHERSCAN } from '../../../../env';

import {
  Atag,
  BridgeContainer,
  BridgeInfos,
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  FloatSpan,
  IconExternalLink,
  FloatVolumeContainer,
  Row,
  RowBridgeTitle,
  VolSpan,
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const FloatVolume = () => {
  const theme = useTheme();
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const networkInfos = useSelector((state) => state.explorer.networkInfos);
  const { floatBalances, stats } = networkInfos;

  const dataEthBridge = [
    { coin: CoinSymbol.BTC, float: floatBalances.btcEth, vol: stats.volume1wksWBTC },
    { coin: CoinSymbol.WBTC, float: floatBalances.wbtc, vol: stats.volume1wksWBTC },
  ];

  const dataBscBridge = [
    {
      coin: CoinSymbol.BTC,
      float: floatBalances.btcBsc,
      vol: stats.volume1wksBTCB,
    },
    {
      coin: CoinSymbol.BTC_B,
      float: floatBalances.btcb,
      vol: stats.volume1wksBTCB,
    },
  ];

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  // Memo: Show 'loading' animation if backend api is broken
  const isLoadingAll = isLoading || floatBalances.btcEth === 0;

  const bridgeInfo = (bridgeData: IBridgeData[]) => {
    return (
      <>
        {bridgeData.map((coin: IBridgeData) => {
          return (
            <CoinInfo key={coin.coin}>
              <Coin symbol={coin.coin} />
              <DataDiv>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.float" />
                  </Text>
                  {isLoadingAll ? (
                    placeholderLoader
                  ) : (
                    <FloatSpan>{<FormattedNumber value={Number(coin.float)} />}</FloatSpan>
                  )}
                </Row>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.vol" />
                  </Text>
                  {isLoadingAll ? (
                    placeholderLoader
                  ) : (
                    <VolSpan>{<FormattedNumber value={Number(coin.vol)} />}</VolSpan>
                  )}
                </Row>
              </DataDiv>
            </CoinInfo>
          );
        })}
      </>
    );
  };

  const networkScan = (scanBaseUrl: string) => {
    const getScanName = (scanBaseUrl: string) => {
      switch (scanBaseUrl) {
        case URL_ETHERSCAN:
          return 'Etherscan';
        case URL_BSCSCAN:
          return 'BscScan';

        default:
          return 'Etherscan';
      }
    };

    const getContract = (scanBaseUrl: string) => {
      switch (scanBaseUrl) {
        case URL_ETHERSCAN:
          return CONTRACTS.bridges.btc_erc[mode].address;
        case URL_BSCSCAN:
          return CONTRACTS.bridges.btc_bep20[mode].address;

        default:
          return CONTRACTS.bridges.btc_erc[mode].address;
      }
    };

    return (
      <Atag
        href={`${scanBaseUrl}/address/${getContract(scanBaseUrl)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Text variant="label">{getScanName(scanBaseUrl)}</Text>
        <IconExternalLink />
      </Atag>
    );
  };

  return (
    <FloatVolumeContainer>
      <BridgeInfos>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-ethereum" />
            </Text>
            {networkScan(URL_ETHERSCAN)}
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataEthBridge)}</CoinContainer>
        </BridgeContainer>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-bsc" />
            </Text>
            {networkScan(URL_BSCSCAN)}
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataBscBridge)}</CoinContainer>
        </BridgeContainer>
      </BridgeInfos>
    </FloatVolumeContainer>
  );
};
