import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';

import {
  DataDiv,
  ExplorerInfosContainer,
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
} from './styled';

export const ExplorerInfos = () => {
  const theme = useTheme();

  const explorer = useSelector((state) => state.explorer);
  const { networkInfos, usd, isLoading } = explorer;
  const { stats, capacity } = networkInfos;

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

  const data = usd && [
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
      icon: <NetworkRewards />,
      description: formattedRewards,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(rewards1wks),
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
              </InfoContainer>
            );
          })}
      </InfosContainer>
    </ExplorerInfosContainer>
  );
};
