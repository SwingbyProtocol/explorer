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
import { explorerLoadingSelector, networkInfoSelector } from '../../../../store';

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
  const { apr, isLoading: aprLoading } = useGetPoolApr();
  const explorerLoading = useSelector(explorerLoadingSelector);
  const networkInfos = useSelector(networkInfoSelector);
  const { floatBalances, stats } = networkInfos;

  const dataEthBridge = [
    { coin: CoinSymbol.BTC, float: floatBalances.btcEth, vol: stats.volume1wksWBTC },
    { coin: CoinSymbol.WBTC, float: floatBalances.wbtc, vol: stats.volume1wksWBTC },
  ];

  const dataSkypoolBridge = [
    {
      coin: CoinSymbol.BTC,
      float: floatBalances.btcSkypool,
      vol: stats.volume1wksWBTC_Skypool,
    },
    {
      coin: CoinSymbol.SKYPOOL_WBTC,
      float: floatBalances.wbtcSkypool,
      vol: stats.volume1wksWBTC_Skypool,
    },
  ];

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const isLoadingAll = explorerLoading;

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

  const networkScan = ({ bridge }: { bridge: SkybridgeBridge }) => {
    const baseUrl = (() => {
      switch (bridge) {
        case 'btc_erc':
        case 'btc_skypool':
          return URL_ETHERSCAN;
      }
    })();

    const scanName = (() => {
      switch (baseUrl) {
        case URL_ETHERSCAN:
          return 'Etherscan';
      }
    })();

    const contract = CONTRACTS.bridges[bridge][mode].address;

    return (
      <Atag href={`${baseUrl}/address/${contract}`} rel="noopener noreferrer" target="_blank">
        <Text variant="label">{scanName}</Text>
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
              id={
                bridge === 'btc_skypool'
                  ? 'home.network.add-liquidity'
                  : 'home.network.remove-liquidity'
              }
              values={{
                value: aprLoading ? (
                  <ColumnInlineBlock>
                    <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.normal} />
                  </ColumnInlineBlock>
                ) : (
                  <FormattedNumber
                    value={apr[bridge].total}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
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
            id={(() => {
              switch (bridge) {
                case 'btc_erc':
                  return 'home.network.bitcoin-ethereum';
                case 'btc_skypool':
                  return 'home.network.bitcoin-skypool';
              }
            })()}
          />
        </TextBridge>
        <RowBridge>
          {networkScan({ bridge })}
          {poolLink(bridge)}
        </RowBridge>
        <CoinContainer>
          {bridgeInfo(bridge === 'btc_erc' ? dataEthBridge : dataSkypoolBridge)}
        </CoinContainer>
      </BridgeContainer>
    );
  };

  return (
    <FloatVolumeContainer>
      <BridgeInfos>{rowBridgeInfo('btc_skypool')}</BridgeInfos>
    </FloatVolumeContainer>
  );
};
