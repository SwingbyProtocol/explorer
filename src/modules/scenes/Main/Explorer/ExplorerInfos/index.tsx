import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { IStats } from '../../../../explorer';

import {
  DataDiv,
  ExplorerInfosContainer,
  InfoContainer,
  InfosContainer,
  Network,
  NetworkCapacity,
  NetworkRewards,
  NetworkValidators,
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
  const data = [
    {
      icon: <Network />,
      description: 'Volume (24hr)',
      value: <FormattedNumber value={Number(stats.volume24Hr)} />,
    },
    {
      icon: <NetworkRewards />,
      description: 'Rewards (24hr)',
      // Todo: Use `FormattedNumber` once `rewards24Hr` value becomes more than 1
      // value: <FormattedNumber value={stats.rewards24Hr} />,
      value: stats.rewards24Hr,
    },
    {
      icon: <NetworkCapacity />,
      description: 'Capacity (Float)',
      value: <FormattedNumber value={Number(capacity)} />,
    },
    {
      icon: <NetworkValidators />,
      description: 'Validators',
      value: stats.validators,
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
                {info.description === 'Validators' ? (
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
                  <ValueSpan variant="accent">${info.value}</ValueSpan>
                </Row>
              </DataDiv>
            </InfoContainer>
          );
        })}
      </InfosContainer>
    </ExplorerInfosContainer>
  );
};
