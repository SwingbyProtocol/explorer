import {
  getFiatAssetFormatter,
  PulsarGlobalStyles,
  PulsarThemeProvider,
  useMatchMedia,
} from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { fetchNodeEarningsList, INodeEarningsResponse } from '../../../metanodes';
import { StylingConstants } from '../../../styles';
import { TextPrimary } from '../../Common';

import {
  Avatar,
  AvatarContainer,
  ColumnPlaceholder,
  Container,
  MetanodeEarnersContainer,
  Rank,
  Row,
  RowLeft,
  RowRight,
  RowRightLabel,
  RowUser,
  TextValue,
} from './styled';

export const MetanodeEarners = () => {
  const [metanodes, setMetanodes] = useState(null);
  const { locale, formatNumber } = useIntl();
  const big = useMatchMedia({ query: `(min-width: ${rem(StylingConstants.media.md)})` });

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeEarningsList();
      setMetanodes(nodes);
    })();
  }, []);

  const formatConfig = {
    locale,
    currency: 'USD',
    maximumSignificantDigits: 4,
  } as const;

  return (
    <PulsarThemeProvider theme="light">
      <PulsarGlobalStyles />
      <Container>
        <MetanodeEarnersContainer>
          {big && (
            <RowUser isLastItem={false}>
              <RowLeft>
                <ColumnPlaceholder />
              </RowLeft>
              <RowRightLabel>
                <TextValue variant="masked">Moniker</TextValue>
                <TextValue variant="masked">
                  <FormattedMessage id="metanode-earners.label.bond" />
                </TextValue>

                <TextValue variant="masked">
                  {' '}
                  <FormattedMessage id="metanode-earners.label.earnings-1W" />
                </TextValue>

                <TextValue variant="masked">
                  {' '}
                  <FormattedMessage id="metanode-earners.label.earnings-1M" />
                </TextValue>
              </RowRightLabel>
            </RowUser>
          )}
          {metanodes?.map((it: INodeEarningsResponse, index: number) => {
            const bond = formatNumber(Number(it.bond), formatConfig);
            const earnings1M = getFiatAssetFormatter(formatConfig).format(Number(it.earnings1M));
            const earnings1W = getFiatAssetFormatter(formatConfig).format(Number(it.earnings1W));
            return (
              <Row key={it.moniker}>
                <RowUser isLastItem={index === metanodes?.length - 1}>
                  <RowLeft>
                    <AvatarContainer>
                      <Rank rank={index + 1}>{index + 1}</Rank>
                      <Avatar value={it.moniker} />
                    </AvatarContainer>
                  </RowLeft>
                  <RowRight>
                    <TextValue variant="accent">{it.moniker}</TextValue>

                    <TextValue variant="masked">
                      {big ? (
                        bond
                      ) : (
                        <FormattedMessage
                          id="metanode-earners.bond"
                          values={{
                            value: bond,
                          }}
                        />
                      )}
                    </TextValue>

                    {big && <TextPrimary>{earnings1W}</TextPrimary>}

                    <TextPrimary>
                      {big ? (
                        earnings1M
                      ) : (
                        <FormattedMessage
                          id="metanode-earners.earn-month"
                          values={{
                            value: earnings1M,
                          }}
                        />
                      )}
                    </TextPrimary>
                  </RowRight>
                </RowUser>
              </Row>
            );
          })}
        </MetanodeEarnersContainer>
      </Container>
    </PulsarThemeProvider>
  );
};
