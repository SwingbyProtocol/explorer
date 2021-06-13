import { nanoid } from 'nanoid';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'styled-components';

import { formatNum } from '../../modules/common';
import { IChartDate } from '../../modules/explorer';
import { LineBox } from '../../modules/scenes/Common';

import { CustomTooltip } from './CustomTooltip';
import { ChartContainer } from './styled';

interface Props {
  chart: IChartDate[];
  isLoading: boolean;
  minHeight: number;
  loader: JSX.Element;
  isAxis: boolean;
}

export const GenerateChart = (props: Props) => {
  const { chart, isLoading, minHeight, loader, isAxis } = props;
  const gradientId = useMemo(() => nanoid(), []);
  const theme = useTheme();
  const intl = useIntl();

  return (
    <ChartContainer>
      {isLoading && loader}
      <LineBox isLoading={isLoading}>
        {!isLoading && chart && (
          <ResponsiveContainer width="100%" minHeight={minHeight}>
            <AreaChart data={chart}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="40%"
                    stopColor={theme.pulsar.color.primary.normal}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.pulsar.color.primary.normal}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Tooltip content={CustomTooltip} />
              <XAxis
                dataKey="at"
                tickFormatter={(label) =>
                  intl.formatDate(label, {
                    month: 'short',
                    day: 'numeric',
                  })
                }
                fontSize="0.75rem"
                fontWeight="500"
                tickLine={false}
                axisLine={false}
                hide={!isAxis}
              />
              <YAxis
                dataKey={(v) => parseInt(v.amount)}
                tickFormatter={(label) => '$' + formatNum(label)}
                domain={['dataMin', 'dataMax']}
                tickLine={false}
                axisLine={false}
                fontSize="0.75rem"
                fontWeight="500"
                hide={!isAxis}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke={theme.pulsar.color.primary.normal}
                fill={`url(#${gradientId})`}
                fillOpacity="0.1"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </LineBox>
    </ChartContainer>
  );
};
