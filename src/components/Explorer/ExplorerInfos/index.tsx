import React from 'react';
import { FormattedNumber } from 'react-intl';

import { DescribeSpan } from '../../DescribeSpan';

import {
  DataDiv,
  ExplorerInfosContainer,
  InfoContainer,
  InfosContainer,
  Network,
  Row,
  RowValidator,
  ValidatorLinkSpan,
  ValueSpan,
  NetworkRewards,
  NetworkCapacity,
  NetworkValidators,
} from './styled';

const ExplorerInfos = (): JSX.Element => {
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
                    <DescribeSpan>{info.description}</DescribeSpan>
                    <ValidatorLinkSpan>All</ValidatorLinkSpan>
                  </RowValidator>
                ) : (
                  <Row>
                    <DescribeSpan>{info.description}</DescribeSpan>
                  </Row>
                )}

                <Row>
                  <ValueSpan>${info.value}</ValueSpan>
                </Row>
              </DataDiv>
            </InfoContainer>
          );
        })}
      </InfosContainer>
    </ExplorerInfosContainer>
  );
};

export default ExplorerInfos;
