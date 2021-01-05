import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { PATH } from '../../../../env';
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
  TextValue,
  TextEst,
} from './styled';

interface Props {
  capacity: number;
  stats: IStats;
}

export const ExplorerInfos = (props: Props) => {
  const { capacity, stats } = props;
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;

  const router = useRouter();
  const { locale } = useIntl();
  const { formatMessage } = useIntl();
  const formattedMetanodes = formatMessage({ id: 'metanodes.metanodes' });
  const formattedRewards = formatMessage({ id: 'home.network.rewards' });

  const data = usd && [
    {
      icon: <Network />,
      description: <FormattedMessage id="home.network.volume" />,
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(Number(stats.volume24HrBTC) * usd.BTC),
    },
    {
      icon: <NetworkRewards />,
      description: formattedRewards,
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
      }).format(stats.rewards24Hr * usd.BTC),
    },
    {
      icon: <NetworkCapacity />,
      description: <FormattedMessage id="home.network.capacity" />,
      value: getFiatAssetFormatter({
        locale: locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(capacity),
    },
    {
      icon: <NetworkMetanodes />,
      description: formattedMetanodes,
      value: stats.metanodes,
    },
  ];

  return (
    <ExplorerInfosContainer>
      <InfosContainer>
        {usd &&
          data.map((info, i) => {
            return (
              <InfoContainer key={i}>
                {info.icon}
                <DataDiv>
                  {info.description === formattedMetanodes ? (
                    <RowValidator>
                      <Text variant="label">{info.description}</Text>
                      <ValidatorLinkSpan
                        variant="accent"
                        onClick={() => router.push(PATH.METANODES)}
                      >
                        <FormattedMessage id="common.all" />
                      </ValidatorLinkSpan>
                    </RowValidator>
                  ) : (
                    <Row>
                      <Text variant="label">{info.description}</Text>
                    </Row>
                  )}
                  {info.description === formattedRewards ? (
                    <Row>
                      <TextValue variant="accent">{info.value}</TextValue>
                      <TextEst variant="masked">
                        {' '}
                        <FormattedMessage id="home.network.est" />
                      </TextEst>
                    </Row>
                  ) : (
                    <Row>
                      <TextValue variant="accent">{info.value}</TextValue>
                    </Row>
                  )}
                </DataDiv>
              </InfoContainer>
            );
          })}
      </InfosContainer>
    </ExplorerInfosContainer>
  );
};
