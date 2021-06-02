import { nanoid } from 'nanoid';
import React, { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import { IChartDate } from '../../modules/explorer';
import { LineBox } from '../../modules/scenes/Common';
import { CustomTooltip } from '../CustomTooltip';
import { LoaderComingSoon } from '../LoaderComingSoon';

import { LineContainer } from './styled';

interface Props {
  chart: IChartDate[];
  isLoading: boolean;
}

export const GenerateChart = (props: Props) => {
  const { chart, isLoading } = props;
  const gradientId = useMemo(() => nanoid(), []);

  return (
    <LineContainer>
      {isLoading && <LoaderComingSoon isPlaceholder={false} isSmallWindow={true} />}
      <LineBox isLoading={isLoading}>
        <ResponsiveContainer width="100%" minHeight={76}>
          <AreaChart data={chart}>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="40%" stopColor="#31D5B8" stopOpacity={1} />
                <stop offset="100%" stopColor="#31D5B8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Tooltip content={CustomTooltip} />
            <YAxis
              dataKey={(v) => parseInt(v.amount)}
              domain={['dataMin', 'dataMax']}
              hide={true}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              fill={`url(#${gradientId})`}
              fillOpacity="0.1"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </LineBox>
    </LineContainer>
  );
};
