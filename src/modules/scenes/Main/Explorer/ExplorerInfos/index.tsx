import { formatFiatAsset, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedNumber, useIntl } from 'react-intl';

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
  // const { locale } = useIntl();

  const data = [
    {
      icon: <Network />,
      description: 'Volume (24hr)',
      // eslint-disable-next-line
      value: <FormattedNumber value={Number(stats.volume24Hr)} style="currency" currency="USD" />,
      // Memo: Show error when using hand phone
      // value: formatFiatAsset({
      //   amount: Number(stats.volume24Hr),
      //   locale: locale,
      //   currency: 'USD',
      // }),
    },
    {
      icon: <NetworkRewards />,
      description: 'Rewards (24hr)',
      // eslint-disable-next-line
      value: <FormattedNumber value={stats.rewards24Hr} style="currency" currency="USD" />,
      // value: formatFiatAsset({
      //   amount: stats.rewards24Hr,
      //   locale: locale,
      //   currency: 'USD',
      // }),
    },
    {
      icon: <NetworkCapacity />,
      description: 'Capacity (Float)',
      // eslint-disable-next-line
      value: <FormattedNumber value={Number(capacity)} style="currency" currency="USD" />,
      // value: formatFiatAsset({
      //   amount: Number(capacity),
      //   locale: locale,
      //   currency: 'USD',
      // }),
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
