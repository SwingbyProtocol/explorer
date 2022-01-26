import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { GenerateChart } from '../../../../../components/GenerateChart';
import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { PATH } from '../../../../env';
import { useToggleMetanode } from '../../../../hooks';

import {
  ChartBox,
  DataDiv,
  DataRow,
  InfoContainer,
  InfosContainer,
  Left,
  Network,
  NetworkMetanodes,
  NetworkRewards,
  Right,
  Row,
  RowReward,
  RowValidator,
  StatsInfoContainer,
  StatsWithoutChart,
  TextValue,
  ValidatorLinkSpan,
} from './styled';

export const StatsInfo = () => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = useIntl();
  const { formatMessage } = useIntl();

  const formattedMetanodes = formatMessage({ id: 'metanodes.metanodes' });
  const formattedRewards = formatMessage({ id: 'home.network.rewards' });

  const stats = useSelector((state) => state.explorer.networkInfos.stats);
  const usd = useSelector((state) => state.explorer.usd);
  const isLoading = useSelector((state) => state.explorer.isLoading);

  const { bridge, rewards, isLoading: isLoadingMetanode } = useToggleMetanode(PATH.ROOT);

  const isLoadingAll = isLoading || isLoadingMetanode || stats.volume1wksBTC === 0;
  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const rewardsSwingbyUsd = rewards ? rewards.weeklyRewardsUsd : 0;

  const dataChart = usd && [
    {
      key: 'volume',
      isLoading: isLoadingAll,
      icon: <Network />,
      description: <FormattedMessage id="home.network.volume" />,
      chart: stats.volumes,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(stats.volume1wksBTC) * usd.BTC),
    },
    {
      key: 'volumeYear',
      isLoading: isLoadingAll,
      icon: <Network />,
      description: <FormattedMessage id="home.network.volume-year" />,
      chart: stats.volumesYear,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(stats.volume1yrBTC) * usd.BTC),
    },
  ];

  const data = [
    {
      key: 'metanodes',
      isLoading: isLoadingAll ? isLoadingAll : stats.metanodes > 1 ? false : true,
      icon: <NetworkMetanodes />,
      description: formattedMetanodes,
      value: stats.metanodes,
    },
    {
      key: 'rewards',
      isLoading: isLoadingAll ? isLoadingAll : Number(rewardsSwingbyUsd) > 1 ? false : true,
      icon: <NetworkRewards />,
      description: formattedRewards,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(rewardsSwingbyUsd)),
    },
  ];

  const loader = <LoaderComingSoon isPlaceholder={false} isSmallWindow={true} />;

  return (
    <StatsInfoContainer>
      <InfosContainer>
        {usd &&
          dataChart.map((info) => {
            return (
              <InfoContainer key={info.key}>
                <Left>
                  {info.icon}
                  <DataDiv>
                    <Row>
                      <Text variant="label">{info.description}</Text>
                    </Row>
                    {info.isLoading ? (
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
                    <GenerateChart
                      chart={info.chart}
                      isLoading={info.isLoading}
                      minHeight={76}
                      loader={loader}
                      isAxis={false}
                    />
                  </ChartBox>
                </Right>
              </InfoContainer>
            );
          })}

        <StatsWithoutChart>
          {usd &&
            data.map((info) => {
              return (
                <InfoContainer key={info.key}>
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
                        <RowReward>
                          <Text variant="label">{info.description}</Text>
                        </RowReward>
                      )}
                      {info.isLoading ? (
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
