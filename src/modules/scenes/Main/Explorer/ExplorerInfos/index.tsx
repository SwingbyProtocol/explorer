import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';

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
  capacity: string;
  stats: IStats;
}

export const ExplorerInfos = (props: Props) => {
  const { capacity, stats } = props;
  const { locale } = useIntl();

  const data = [
    {
      icon: <Network />,
      description: 'Volume (24hr)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
      }).format(Number(stats.volume24Hr)),
    },
    {
      icon: <NetworkRewards />,
      description: 'Rewards (24hr)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
      }).format(stats.rewards24Hr),
    },
    {
      icon: <NetworkCapacity />,
      description: 'Capacity (Float)',
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(capacity)),
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
        {data.map((info) => {
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
