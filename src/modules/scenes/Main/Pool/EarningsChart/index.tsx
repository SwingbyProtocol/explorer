import { Text } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { Box, Column, EarningsChartContainer, LineContainer, TextDate, TitleDiv } from './styled';

export const EarningsChart = () => {
  const volumes = ['13', '10', '12.5', '11.7', '12', '11.5', '9'];
  const [chartDate, setChartDate] = useState('All');
  const chartDateOption = ['1d', '30d', 'All'];
  const { formatDate } = useIntl();

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');
    const today = new Date();

    return {
      labels: [
        formatDate(new Date().setDate(today.getDate() - 6), {
          month: 'short',
          day: 'numeric',
        }),
        '',
        '',
        formatDate(new Date().setDate(today.getDate() - 3), {
          month: 'short',
          day: 'numeric',
        }),
        '',
        '',
        formatDate(today, {
          month: 'short',
          day: 'numeric',
        }),
      ],
      datasets: [
        {
          fill: 'start',

          backgroundColor: gradient,
          borderColor: '#31D5B8',
          data: [
            volumes[6],
            volumes[5],
            volumes[4],
            volumes[3],
            volumes[2],
            volumes[1],
            volumes[0],
          ],
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
            stepSize: 2,
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
            stepSize: 1,
            fontColor: '#929D9D',
            fontSize: 10,
            padding: 10,
          },
        },
      ],
    },
  };
  return (
    <EarningsChartContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">Earnings</Text>
          <Column>
            {chartDateOption.map((date: string) => {
              return (
                <TextDate
                  variant="label"
                  onClick={() => setChartDate(date)}
                  isActive={date === chartDate}
                  isAll={date === 'All'}
                >
                  {date}
                </TextDate>
              );
            })}
          </Column>
        </TitleDiv>
        <LineContainer>
          <Line type="line" data={data} options={options} height={110} />
        </LineContainer>
      </Box>
    </EarningsChartContainer>
  );
};
