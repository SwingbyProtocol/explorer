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
  const { pulsar } = useTheme();
  const intl = useIntl();

  // Memo: 'stopOpacity: 1' until 85% for light theme
  const gradients = [
    { offset: '40%', stopOpacity: 1 },
    { offset: '60%', stopOpacity: 0.8 },
    { offset: '70%', stopOpacity: 0.6 },
    { offset: '85%', stopOpacity: pulsar.id === 'PulsarDark' ? 0.4 : 1 },
    { offset: '90%', stopOpacity: 0.2 },
    { offset: '100%', stopOpacity: 0.1 },
  ];

  return (
    <ChartContainer>
      {isLoading && loader}
      <LineBox isLoading={isLoading}>
        {chart && (
          <ResponsiveContainer width="100%" minHeight={minHeight}>
            <AreaChart data={chart}>
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
                domain={[0, 'dataMax']}
                tickLine={false}
                axisLine={false}
                fontSize="0.75rem"
                fontWeight="500"
                scale="sqrt"
                hide={!isAxis}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke={pulsar.color.primary.normal}
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
