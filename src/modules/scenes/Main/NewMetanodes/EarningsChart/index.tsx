import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { ENDPOINT_EARNINGS } from '../../../../env';
import { fetch } from '../../../../fetch';
import { IEarning, makeEarningsData, makeTimeLabels, TEarningPeriod } from '../../../../pool';
import { LineBox } from '../../../Common';

import { Box, Column, EarningsChartContainer, LineContainer, TextDate, TitleDiv } from './styled';

export const EarningsChart = () => {
  const today = new Date();
  const initialEarningsAll = {
    values: ['0', '0', '0', '0', '0', '0', '0'],
    times: [
      new Date().setDate(today.getDate() - 6),
      new Date().setDate(today.getDate() - 5),
      new Date().setDate(today.getDate() - 4),
      new Date().setDate(today.getDate() - 3),
      new Date().setDate(today.getDate() - 2),
      new Date().setDate(today.getDate() - 1),
      String(today),
    ],
  };

  const [chartDuration, setChartDuration] = useState<TEarningPeriod>('All');
  const [earningsAll, setEarningsAll] = useState(initialEarningsAll);
  const [earnings14Days, setEarnings14Days] = useState(null);
  const [earnings24Hours, setEarnings24Hours] = useState(null);
  const [earnings, setEarnings] = useState(earningsAll);
  const [isLoading, setIsLoading] = useState(true);

  const pool = useSelector((state) => state.pool);
  const { userAddress } = pool;

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

  const { formatDate, formatTime } = useIntl();

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    return {
      labels: makeTimeLabels(earnings.times as string[], chartDuration, formatDate, formatTime),
      datasets: [
        {
          fill: 'start',

          backgroundColor: gradient,
          borderColor: '#31D5B8',
          data: earnings.values,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    pointDotStrokeWidth: 0,
    legend: { display: false },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 10,
            fontColor: '#929D9D',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: '#929D9D',
            fontSize: 10,
            padding: 20,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const loading = earnings.values === initialEarningsAll.values;
    if (!loading && userAddress) {
      setTimeout(() => {
        // Todo: Change to 'false' after 'earnings API' works
        setIsLoading(true);
      }, 800);
    }
  }, [earnings.values, initialEarningsAll.values, userAddress]);

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
          {/* Memo: remove isPlaceholder props after 'earnings API' works */}
          {isLoading && <LoaderComingSoon isPlaceholder={true} />}
          <LineBox isLoading={isLoading}>
            <Line type="line" data={data} options={options} height={110} />
          </LineBox>
        </LineContainer>
      </Box>
    </EarningsChartContainer>
  );
};
