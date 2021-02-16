import {
  getFiatAssetFormatter,
  PulsarGlobalStyles,
  PulsarThemeProvider,
  useMatchMedia,
} from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PromiseValue } from 'type-fest';

import { fetchNodeEarningsList } from '../../../metanodes';
import { StylingConstants } from '../../../styles';
import { TextPrimary } from '../../Common';

import {
  Avatar,
  AvatarContainer,
  GlobalStyles,
  Rank,
  Divider,
  TextValue,
  Table,
  Cell,
  Space,
} from './styled';

type Metanodes = PromiseValue<ReturnType<typeof fetchNodeEarningsList>>;

export const MetanodeEarners = () => {
  const [metanodes, setMetanodes] = useState<Metanodes>([]);
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
      <GlobalStyles />
      <Table>
        {big && (
          <>
            <Cell />
            <Cell>
              <TextValue variant="masked">Moniker</TextValue>
            </Cell>
            <Cell>
              <TextValue variant="masked">
                <FormattedMessage id="metanode-earners.label.bond" />
              </TextValue>
            </Cell>
            <Cell>
              <TextValue variant="masked">
                <FormattedMessage id="metanode-earners.label.earnings-1W" />
              </TextValue>
            </Cell>
            <Cell>
              <TextValue variant="masked">
                <FormattedMessage id="metanode-earners.label.earnings-1M" />
              </TextValue>
            </Cell>
            <Divider />
          </>
        )}

        {!big && <Space />}

        {metanodes.map((it, index) => {
          const bond = formatNumber(Number(it.amountStaked), formatConfig);
          const earnings1M = getFiatAssetFormatter(formatConfig).format(Number(it.reward1mUsdt));
          const earnings1W = getFiatAssetFormatter(formatConfig).format(Number(it.reward1wUsdt));
          return (
            <React.Fragment key={it.address}>
              <AvatarContainer>
                <Rank rank={index + 1}>{index + 1}</Rank>
                <Avatar value={it.address} />
              </AvatarContainer>

              <Cell>
                <TextValue variant="accent">{it.monikers[0] ?? it.address}</TextValue>
              </Cell>

              <Cell>
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
              </Cell>

              {big && (
                <Cell>
                  <TextPrimary>{earnings1W}</TextPrimary>
                </Cell>
              )}

              <Cell>
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
              </Cell>

              {index < metanodes.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}

        {!big && <Space />}
      </Table>
    </PulsarThemeProvider>
  );
};
