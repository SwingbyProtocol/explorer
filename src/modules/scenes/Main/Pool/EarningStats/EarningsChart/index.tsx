import { Text, useMatchMedia } from '@swingby-protocol/pulsar';
import { nanoid } from 'nanoid';
import { rem } from 'polished';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'styled-components';

import { formatNum } from '../../../../../common';
import { IEarningsChartData, mergeSameDateEarningsData } from '../../../../../pool';
import { StylingConstants } from '../../../../../styles';

import { CustomTooltip } from './CustomTooltip';
import {
  Column,
  ColumnEarned,
  EarningsChartContainer,
  MessageBox,
  TextDate,
  TitleDiv,
} from './styled';

type TPool = 'sbBTC' | 'thirdPartyFarm';

export const EarningsChart = ({ farming, bridge }) => {
  const initialActiveState =
    //  Todo: remove condition once published sbBTC pool on BSC
    bridge === 'btc_bep20'
      ? 'thirdPartyFarm'
      : bridge && farming.sbBtcFarm.claimedSwingby > 0
      ? 'sbBTC'
      : bridge && farming.thirdPartyFarm.claimedSwingby > 0
      ? 'thirdPartyFarm'
      : 'sbBTC';

  const [active, setActive] = useState<TPool>(initialActiveState);

  useEffect(() => {
    setActive(initialActiveState);
  }, [bridge, initialActiveState]);

  const gradientId = useMemo(() => nanoid(), []);
  const { pulsar } = useTheme();
  const [chartData, setChartData] = useState<IEarningsChartData[]>([
    {
      name: '',
      timestamp: 0,
      SWINGBY: 0,
    },
  ]);

  const { media } = StylingConstants;
  const xl = useMatchMedia({ query: `(min-width: ${rem(media.xl)})` });
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const md = useMatchMedia({ query: `(min-width: ${rem(media.md)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const xs = useMatchMedia({ query: `(min-width: ${rem(media.xs)})` });
  const chartWidth = xl ? 380 : lg ? 320 : md ? 320 : sm ? 420 : xs ? 320 : 300;

  // Memo: 'stopOpacity: 1' until 85% for light theme
  const gradients = [
    { offset: '40%', stopOpacity: 1 },
    { offset: '60%', stopOpacity: 0.8 },
    { offset: '70%', stopOpacity: 0.6 },
    { offset: '85%', stopOpacity: pulsar.id === 'PulsarDark' ? 0.4 : 1 },
    { offset: '90%', stopOpacity: 0.2 },
    { offset: '100%', stopOpacity: 0.1 },
  ];

  const rawData = bridge && farming[active === 'sbBTC' ? 'sbBtcFarm' : 'thirdPartyFarm'];
  const pendingSwingby = rawData.pendingSwingby;
  const claimedSwingby = rawData.claimedSwingby;
  const claimedTxs = rawData.claimedTxs;
  const earnedSwingby = pendingSwingby + claimedSwingby;

  useEffect(() => {
    const data = mergeSameDateEarningsData({ claimedTxs, pendingSwingby });
    setChartData(data);
  }, [claimedTxs, pendingSwingby]);

  return (
    <EarningsChartContainer>
      <TitleDiv>
        <ColumnEarned>
          {earnedSwingby ? (
            <Text variant="label">
              <FormattedMessage
                id="pool.earning.value-earned-swingby"
                values={{
                  value: (
                    <FormattedNumber
                      value={earnedSwingby}
                      maximumFractionDigits={2}
                      minimumFractionDigits={0}
                    />
                  ),
                }}
              />
            </Text>
          ) : (
            <div />
          )}
        </ColumnEarned>
        <Column>
          <TextDate
            variant="label"
            onClick={() => setActive('thirdPartyFarm')}
            isActive={'thirdPartyFarm' === active}
          >
            {bridge === 'btc_erc' ? 'Uni / Sushi' : 'Pancake'}
          </TextDate>
          {/* Todo: remove condition once published sbBTC pool on BSC */}
          {bridge === 'btc_erc' && (
            <TextDate
              variant="label"
              onClick={() => setActive('sbBTC')}
              isActive={'sbBTC' === active}
            >
              <FormattedMessage id="common.sbbtc" />
            </TextDate>
          )}
        </Column>
      </TitleDiv>
      {pendingSwingby > 0 || claimedSwingby > 0 ? (
        <ResponsiveContainer width={chartWidth} height={182}>
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 6,
              left: -30,
              bottom: 4,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                {gradients.map((it) => (
                  <stop
                    key={it.offset}
                    offset={it.offset}
                    stopColor={pulsar.color.primary.normal}
                    stopOpacity={it.stopOpacity}
                  />
                ))}
              </linearGradient>
            </defs>
            <Tooltip content={CustomTooltip} />
            <XAxis
              dataKey="name"
              fontSize="0.75rem"
              fontWeight="500"
              tickLine={false}
              axisLine={true}
            />
            <YAxis
              tickFormatter={(label) => String(formatNum(label))}
              domain={[0, 'dataMax']}
              fontSize="0.75rem"
              fontWeight="500"
              scale="sqrt"
              tickLine={false}
              axisLine={true}
            />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="SWINGBY"
              stroke={pulsar.color.primary.normal}
              fill={`url(#${gradientId})`}
              fillOpacity="0.1"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <MessageBox>
          <Text variant="title-xs">
            <FormattedMessage
              id="pool.earning.no-record"
              values={{
                value: (
                  <>
                    <br />
                    <br />
                  </>
                ),
              }}
            />
          </Text>
        </MessageBox>
      )}
    </EarningsChartContainer>
  );
};
