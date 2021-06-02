import { Text } from '@swingby-protocol/pulsar';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { nanoid } from 'nanoid';

import { Loader } from '../../../../../components/Loader';
import { formatNum } from '../../../../common';
import { IChartDate } from '../../../../explorer';
import { CustomTooltip } from '../../../../../components/CustomTooltip';

import { Box, TitleDiv, TotalSwingbyBondContainer } from './styled';

interface Props {
  bondHistories: IChartDate[] | null;
  isLoading: boolean;
}

export const TotalSwingbyBond = (props: Props) => {
  const { bondHistories, isLoading } = props;
  const intl = useIntl();
  const chart = bondHistories && bondHistories;
  const gradientId = useMemo(() => nanoid(), []);
  const loader = <Loader marginTop={0} minHeight={128} />;

  return (
    <div>
      <TotalSwingbyBondContainer>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="metanodes.total-swingby-bond" />
          </Text>
        </TitleDiv>
        <Box>
          {!isLoading ? (
            <ResponsiveContainer width="100%" height="100%" minHeight={130}>
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="40%" stopColor="#31D5B8" stopOpacity={1} />
                    <stop offset="100%" stopColor="#31D5B8" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                />
                <YAxis
                  dataKey={(v) => parseInt(v.amount)}
                  tickFormatter={(label) => '$' + formatNum(label)}
                  domain={['dataMin', 'dataMax']}
                  tickLine={false}
                  axisLine={false}
                  fontSize="0.75rem"
                  fontWeight="500"
                />
                <Tooltip content={CustomTooltip} />
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
          ) : (
            loader
          )}
        </Box>
      </TotalSwingbyBondContainer>
    </div>
  );
};
