import { Text } from '@swingby-protocol/pulsar';
import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { mode, URL_ETHERSCAN } from '../../../../env';
import { IconExternalLink } from '../../../Common';
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
  const explorerLoading = useSelector(explorerLoadingSelector);
  const networkInfos = useSelector(networkInfoSelector);
  const { floatBalances, stats } = networkInfos;

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

  const liquidityLink = (bridge: SkybridgeBridge) => {
    return (
      <Atag href={`/liquidity?bridge=${bridge}`} rel="noopener noreferrer" target="_blank">
        <TextLink variant="label">
          <FormattedMessage id={'home.network.add-liquidity'} />
        </TextLink>
      </Atag>
    );
  };

  const rowBridgeInfo = (bridge: SkybridgeBridge) => {
    return (
      <BridgeContainer>
        <TextBridge variant="label">
          <FormattedMessage id={'home.network.bitcoin-skypool'} />
        </TextBridge>
        <RowBridge>
          {networkScan({ bridge })}
          {liquidityLink(bridge)}
        </RowBridge>
        <CoinContainer>{bridgeInfo(dataSkypoolBridge)}</CoinContainer>
      </BridgeContainer>
    );
  };

  return (
    <FloatVolumeContainer>
      <BridgeInfos>{rowBridgeInfo('btc_skypool')}</BridgeInfos>
    </FloatVolumeContainer>
  );
};
