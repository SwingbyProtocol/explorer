import { useMatchMedia } from '@swingby-protocol/pulsar';
import { nanoid } from 'nanoid';
import { rem } from 'polished';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'styled-components';

import { formatNum } from '../../../../../common';
import { formatAprData, IAprChartData } from '../../../../../pool';
import { StylingConstants } from '../../../../../styles';

import { CustomTooltip } from './CustomTooltip';
import { Column, AprHistoricalChartContainer, TextDate, TitleDiv } from './styled';

type TPool = 'sbBtcErc20' | 'sbBtcBep20' | 'uni' | 'sushi' | 'pancake';

export const AprHistoricalChart = ({ aprHistoric, bridge }) => {
  const initialActiveState =
    //  Todo: update to 'sbBtcBep20' once published sbBTC pool on BSC
    bridge === 'btc_bep20' ? 'pancake' : 'sbBtcErc20';

  const [active, setActive] = useState<TPool>(initialActiveState);

  useEffect(() => {
    setActive(initialActiveState);
  }, [bridge, initialActiveState]);

  const gradientId = useMemo(() => nanoid(), []);
  const { pulsar } = useTheme();
  const [chartData, setChartData] = useState<IAprChartData[]>([
    {
      name: '',
      timestamp: 0,
      APR: 0,
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

  useEffect(() => {
    const data = formatAprData(aprHistoric[active]);
    setChartData(data);
  }, [aprHistoric, active]);

  return (
    <AprHistoricalChartContainer>
      <TitleDiv>
        <div />
        <Column bridge={bridge}>
          <TextDate
            variant="label"
            onClick={() => setActive(bridge === 'btc_bep20' ? 'pancake' : 'uni')}
            isActive={bridge === 'btc_bep20' ? active === 'pancake' : active === 'uni'}
          >
            {bridge === 'btc_bep20' ? (
              <FormattedMessage id="pool.earning.pancake" />
            ) : (
              <FormattedMessage id="pool.earning.uni" />
            )}
          </TextDate>
          {bridge === 'btc_erc' && (
            <TextDate
              variant="label"
              onClick={() => setActive('sushi')}
              isActive={'sushi' === active}
            >
              <FormattedMessage id="pool.earning.sushi" />
            </TextDate>
          )}
          {/* Todo: remove condition once published sbBTC pool on BSC */}
          {bridge === 'btc_erc' && (
            <TextDate
              variant="label"
              onClick={() => setActive('sbBtcErc20')}
              isActive={'sbBtcErc20' === active}
            >
              <FormattedMessage
                id={bridge === 'btc_erc' ? 'common.sbbtc.legacy' : 'common.sbbtc'}
              />
            </TextDate>
          )}
        </Column>
      </TitleDiv>
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
            dataKey="APR"
            stroke={pulsar.color.primary.normal}
            fill={`url(#${gradientId})`}
            fillOpacity="0.1"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AprHistoricalChartContainer>
  );
};
