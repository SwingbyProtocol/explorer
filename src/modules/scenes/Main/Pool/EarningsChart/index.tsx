import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { GenerateChart } from '../../../../../components/GenerateChart';
import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { ENDPOINT_EARNINGS } from '../../../../env';
import { fetch } from '../../../../fetch';
import { IEarning, makeEarningsData, TEarningPeriod } from '../../../../pool';

import { Box, Column, EarningsChartContainer, TextDate, TitleDiv, ChartContainer } from './styled';

export const EarningsChart = () => {
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

  const loader = <LoaderComingSoon isPlaceholder={true} />;

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
        <ChartContainer>
          <GenerateChart
            chart={earnings}
            isLoading={isLoading}
            minHeight={130}
            loader={loader}
            isAxis={true}
          />
        </ChartContainer>
      </Box>
    </EarningsChartContainer>
  );
};
