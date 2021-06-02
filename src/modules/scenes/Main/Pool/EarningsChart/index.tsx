import { Text } from '@swingby-protocol/pulsar';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CustomTooltip } from '../../../../../components/CustomTooltip';
import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { formatNum } from '../../../../common';
import { ENDPOINT_EARNINGS } from '../../../../env';
import { fetch } from '../../../../fetch';
import { IEarning, makeEarningsData, TEarningPeriod } from '../../../../pool';
import { LineBox } from '../../../Common';

import { Box, Column, EarningsChartContainer, LineContainer, TextDate, TitleDiv } from './styled';

export const EarningsChart = () => {
  const gradientId = useMemo(() => nanoid(), []);
  const intl = useIntl();
  const [chartDuration, setChartDuration] = useState<TEarningPeriod>('All');
  const [earningsAll, setEarningsAll] = useState(null);
  const [earnings14Days, setEarnings14Days] = useState(null);
  const [earnings24Hours, setEarnings24Hours] = useState(null);
  const [earnings, setEarnings] = useState(earningsAll);

  // Memo: use useState once API enable
  const isLoading = true;

  useEffect(() => {
    (async () => {
      const urlDaily = `${ENDPOINT_EARNINGS}/historic/daily`;
      const urlHourly = `${ENDPOINT_EARNINGS}/historic/hourly`;

      const results = await Promise.all([
        fetch<IEarning[]>(urlDaily),
        fetch<IEarning[]>(urlHourly),
      ]);
      const dailyEarnings = results[0].ok && results[0].response;
      const hourlyEarnings = results[1].ok && results[1].response;
      const earningsAllData = makeEarningsData(dailyEarnings, 'All');
      const earnings14DaysData = makeEarningsData(dailyEarnings, '14d');
      const earnings24HoursData = makeEarningsData(hourlyEarnings, '1d');

      setEarningsAll(earningsAllData);
      setEarnings14Days(earnings14DaysData);
      setEarnings24Hours(earnings24HoursData);
    })();
  }, []);

  useEffect(() => {
    if (earningsAll && earnings14Days && earnings24Hours) {
      if (chartDuration === 'All') {
        setEarnings(earningsAll);
      }
      if (chartDuration === '14d') {
        setEarnings(earnings14Days);
      }
      if (chartDuration === '1d') {
        setEarnings(earnings24Hours);
      }
    }
  }, [chartDuration, earningsAll, earnings14Days, earnings24Hours]);

  return (
    <EarningsChartContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="pool.earnings" />
          </Text>
          <Column>
            {/* Memo: Somehow occurs exponential number error in '14d' if use `map` */}
            <TextDate
              variant="label"
              onClick={() => setChartDuration('1d')}
              isActive={'1d' === chartDuration}
              isAll={false}
            >
              <FormattedMessage id="pool.1d" />
            </TextDate>
            <TextDate
              variant="label"
              onClick={() => setChartDuration('14d')}
              isActive={'14d' === chartDuration}
              isAll={false}
            >
              <FormattedMessage id="pool.14d" />
            </TextDate>
            <TextDate
              variant="label"
              onClick={() => setChartDuration('All')}
              isActive={'All' === chartDuration}
              isAll={true}
            >
              <FormattedMessage id="common.all" />
            </TextDate>
          </Column>
        </TitleDiv>
        <LineContainer>
          {/* Todo: remove isPlaceholder props after 'earnings API' works */}
          {isLoading && <LoaderComingSoon isPlaceholder={true} />}
          <LineBox isLoading={isLoading}>
            <ResponsiveContainer width="100%" height="100%" minHeight={110}>
              <AreaChart data={earnings}>
                <defs>
                  <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="40%" stopColor="#31D5B8" stopOpacity={1} />
                    <stop offset="100%" stopColor="#31D5B8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="timestamp"
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
                  dataKey={(v) => parseInt(v.value)}
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
                  dataKey="value"
                  stroke="#82ca9d"
                  fill={`url(#${gradientId})`}
                  fillOpacity="0.1"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </LineBox>
        </LineContainer>
      </Box>
    </EarningsChartContainer>
  );
};
