import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedNumber } from 'react-intl';

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

export const ExplorerInfos = () => {
  const dummyData = [
    {
      icon: <Network />,
      description: 'Volume (24hr)',
      value: <FormattedNumber value={128130} />,
    },
    {
      icon: <NetworkRewards />,
      description: 'Rewards (24hr)',
      value: <FormattedNumber value={128130} />,
    },
    {
      icon: <NetworkCapacity />,
      description: 'Capacity (Float)',
      value: <FormattedNumber value={128130} />,
    },
    {
      icon: <NetworkValidators />,
      description: 'Validators',
      value: 50,
    },
  ];

  return (
    <ExplorerInfosContainer>
      <InfosContainer>
        {dummyData.map((info) => {
          return (
            <InfoContainer key={info.description}>
              {info.icon}
              <DataDiv>
                {info.description === 'Validators' ? (
                  <RowValidator>
                    <Text variant="label">{info.description}</Text>
                    <ValidatorLinkSpan>All</ValidatorLinkSpan>
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
