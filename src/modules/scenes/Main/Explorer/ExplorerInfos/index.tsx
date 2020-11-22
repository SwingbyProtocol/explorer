import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { IStats } from '../../../../explorer';

import {
  DataDiv,
  ExplorerInfosContainer,
  InfoContainer,
  InfosContainer,
  Network,
  NetworkCapacity,
  NetworkRewards,
  NetworkMetanodes,
  Row,
  RowValidator,
  ValidatorLinkSpan,
  ValueSpan,
} from './styled';

interface Props {
  capacity: number;
  stats: IStats;
}

export const ExplorerInfos = (props: Props) => {
  const { capacity, stats } = props;
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;

  const { locale } = useIntl();

  const data = usd && [
    {
      icon: <Network />,
      description: 'Volume (24hr)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(Number(stats.volume24HrBtc) * usd.BTC),
    },
    {
      icon: <NetworkRewards />,
      description: 'Rewards (24hr)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
      }).format(stats.rewards24Hr * usd.BTC),
    },
    {
      icon: <NetworkCapacity />,
      description: 'Capacity (Float)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(capacity),
    },
    {
      icon: <NetworkMetanodes />,
      description: 'Metanodes',
      value: stats.metanodes,
    },
  ];

  return (
    <ExplorerInfosContainer>
      <InfosContainer>
        {usd &&
          data.map((info) => {
            return (
              <InfoContainer key={info.description}>
                {info.icon}
                <DataDiv>
                  {info.description === 'Metanodes' ? (
                    <RowValidator>
                      <Text variant="label">{info.description}</Text>
                      <ValidatorLinkSpan variant="accent">All</ValidatorLinkSpan>
                    </RowValidator>
                  ) : (
                    <Row>
                      <Text variant="label">{info.description}</Text>
                    </Row>
                  )}

                  <Row>
                    <ValueSpan variant="accent">{info.value}</ValueSpan>
                  </Row>
                </DataDiv>
              </InfoContainer>
            );
          })}
      </InfosContainer>
    </ExplorerInfosContainer>
  );
};
