import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { mode, URL_ETHERSCAN } from '../../../../env';
import { useGetPoolApr } from '../../../../hooks';
import { ColumnInlineBlock, IconExternalLink } from '../../../Common';

import {
  Atag,
  BridgeContainer,
  BridgeInfos,
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  FloatSpan,
  FloatVolumeContainer,
  Row,
  RowBridge,
  VolSpan,
  TextBridge,
  TextLink,
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const FloatVolume = () => {
  const theme = useTheme();
  const { apr } = useGetPoolApr();
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const networkInfos = useSelector((state) => state.explorer.networkInfos);
  const { floatBalances, stats } = networkInfos;

  const dataEthBridge = [
    { coin: CoinSymbol.BTC, float: floatBalances.btcEth, vol: stats.volume1wksWBTC },
    { coin: CoinSymbol.WBTC, float: floatBalances.wbtc, vol: stats.volume1wksWBTC },
  ];

  const dataSkypoolsBridge = [
    {
      coin: CoinSymbol.BTC,
      float: floatBalances.btcSkypools,
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

        default:
          return 'Etherscan';
      }
    };

    const getContract = (scanBaseUrl: string) => {
      switch (scanBaseUrl) {
        case URL_ETHERSCAN:
          return CONTRACTS.bridges.btc_erc[mode].address;

        // case URL_ETHERSCAN:
        //   return CONTRACTS.bridges.btc_skypool[mode].address;

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

  const poolLink = (bridge: SkybridgeBridge) => {
    return (
      <Tooltip
        content={
          <Tooltip.Content>
            <Text variant="normal">
              <FormattedMessage
                id="home.network.apy.sbbtc"
                values={{
                  value: (
                    <FormattedNumber
                      value={apr[bridge].sbBtc}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </Text>
            <br />
            <Text variant="normal">
              <FormattedMessage
                id="home.network.apr.farm"
                values={{
                  value: (
                    <FormattedNumber
                      value={apr[bridge].farm}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </Text>
          </Tooltip.Content>
        }
        targetHtmlTag="span"
      >
        <Atag href={`/pool?bridge=${bridge}`} rel="noopener noreferrer" target="_blank">
          <TextLink variant="label">
            <FormattedMessage
              id="home.network.add-liquidity"
              values={{
                value: apr[bridge].total ? (
                  <FormattedNumber
                    value={apr[bridge].total}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                ) : (
                  <ColumnInlineBlock>
                    <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.normal} />
                  </ColumnInlineBlock>
                ),
              }}
            />
          </TextLink>
        </Atag>
      </Tooltip>
    );
  };

  const rowBridgeInfo = (bridge: SkybridgeBridge) => {
    return (
      <BridgeContainer>
        <TextBridge variant="label">
          <FormattedMessage
            id={
              bridge === 'btc_erc'
                ? 'home.network.bitcoin-ethereum'
                : 'home.network.bitcoin-skypools'
            }
          />
        </TextBridge>
        <RowBridge>
          {networkScan(URL_ETHERSCAN)}
          {poolLink(bridge)}
        </RowBridge>
        <CoinContainer>
          {bridgeInfo(bridge === 'btc_erc' ? dataEthBridge : dataSkypoolsBridge)}
        </CoinContainer>
      </BridgeContainer>
    );
  };

  return (
    <FloatVolumeContainer>
      <BridgeInfos>
        {rowBridgeInfo('btc_erc')}
        {rowBridgeInfo('btc_skypool')}
      </BridgeInfos>
    </FloatVolumeContainer>
  );
};
