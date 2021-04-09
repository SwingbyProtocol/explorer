import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { GenerateChart } from '../../../../../components/GenerateChart';
import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';

import {
  DataDiv,
  StatsInfoContainer,
  InfoContainer,
  InfosContainer,
  Network,
  NetworkCapacity,
  NetworkMetanodes,
  NetworkRewards,
  Row,
  RowValidator,
  TextValue,
  ValidatorLinkSpan,
  Left,
  Right,
  ChartBox,
  StatsWithoutChart,
  DataRow,
} from './styled';

export const StatsInfo = () => {
  const theme = useTheme();

  const networkInfos = useSelector((state) => state.explorer.networkInfos);
  const { stats, capacity } = networkInfos;

  const usd = useSelector((state) => state.explorer.usd);
  const isLoading = useSelector((state) => state.explorer.isLoading);

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const router = useRouter();
  const { locale } = useIntl();
  const { formatMessage } = useIntl();
  const formattedMetanodes = formatMessage({ id: 'metanodes.metanodes' });
  const formattedRewards = formatMessage({ id: 'home.network.rewards' });
  const { bridge } = useToggleBridge(PATH.ROOT);

  const rewards1wks = stats.rewards1wksUSD;

  const dataChart = usd && [
    {
      icon: <Network />,
      description: <FormattedMessage id="home.network.volume" />,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(stats.volume1wksBTC) * usd.BTC),
    },
    {
      icon: <NetworkCapacity />,
      description: 'Swingby Locked',
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(capacity),
    },
    {
      icon: <NetworkCapacity />,
      description: <FormattedMessage id="home.network.capacity" />,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(capacity),
    },
  ];

  const data = [
    {
      icon: <NetworkMetanodes />,
      description: formattedMetanodes,
      value: stats.metanodes,
    },
    {
      icon: <NetworkRewards />,
      description: formattedRewards,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(rewards1wks),
    },
  ];

  return (
    <StatsInfoContainer>
      <InfosContainer>
        {usd &&
          dataChart.map((info, i) => {
            return (
              <InfoContainer key={i}>
                <Left>
                  {info.icon}
                  <DataDiv>
                    <Row>
                      <Text variant="label">{info.description}</Text>
                    </Row>
                    {isLoading ? (
                      placeholderLoader
                    ) : (
                      <Row>
                        <TextValue variant="accent">{info.value}</TextValue>
                      </Row>
                    )}
                  </DataDiv>
                </Left>
                <Right>
                  <ChartBox>
                    <GenerateChart />
                  </ChartBox>
                </Right>
              </InfoContainer>
            );
          })}
        <StatsWithoutChart>
          {' '}
          {usd &&
            data.map((info, i) => {
              return (
                <InfoContainer key={i}>
                  <DataRow>
                    {info.icon}
                    <DataDiv>
                      {info.description === formattedMetanodes ? (
                        <RowValidator>
                          <Text variant="label">{info.description}</Text>
                          <ValidatorLinkSpan
                            variant="accent"
                            onClick={() =>
                              router.push({
                                pathname: PATH.METANODES,
                                query: { bridge: bridge ? bridge : SKYBRIDGE_BRIDGES[0] },
                              })
                            }
                          >
                            <FormattedMessage id="common.all" />
                          </ValidatorLinkSpan>
                        </RowValidator>
                      ) : (
                        <Row>
                          <Text variant="label">{info.description}</Text>
                        </Row>
                      )}
                      {isLoading ? (
                        placeholderLoader
                      ) : (
                        <Row>
                          <TextValue variant="accent">{info.value}</TextValue>
                        </Row>
                      )}
                    </DataDiv>
                  </DataRow>
                </InfoContainer>
              );
            })}
        </StatsWithoutChart>
      </InfosContainer>
    </StatsInfoContainer>
  );
};
