import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { convert2Currency, numToK } from '../../../../common';

import { Box, LineContainer, LineDiv, SwapVolumeContainer, TitleDiv } from './styled';

export const SwapVolume = () => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { formatDate } = useIntl();
  const explorer = useSelector((state) => state.explorer);
  const { networkInfos, usd, isLoading } = explorer;
  const { stats } = networkInfos;
  const { volumes } = stats;
  const intl = useIntl();

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    const handleFormatData = (dateAgo: number) => {
      const today = new Date();
      return formatDate(today.setDate(today.getDate() - dateAgo), {
        month: 'short',
        day: 'numeric',
      });
    };

    return {
      labels: [
        handleFormatData(6),
        handleFormatData(5),
        handleFormatData(4),
        handleFormatData(3),
        handleFormatData(2),
        handleFormatData(1),
        handleFormatData(0),
      ],
      datasets: [
        {
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: 'white',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1.5,
          // Memo: To disable pointHit dot
          pointHitRadius: 0,
          fill: 'start',
          backgroundColor: gradient,
          borderColor: '#31D5B8',
          data: [
            convert2Currency(volumes[6], usd.BTC),
            convert2Currency(volumes[5], usd.BTC),
            convert2Currency(volumes[4], usd.BTC),
            convert2Currency(volumes[3], usd.BTC),
            convert2Currency(volumes[2], usd.BTC),
            convert2Currency(volumes[1], usd.BTC),
            convert2Currency(volumes[0], usd.BTC),
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

    tooltips: {
      displayColors: false,
      position: 'nearest',
      intersect: false,
      callbacks: {
        label: (data) => {
          return intl.formatNumber(data.value, { style: 'currency', currency: 'USD' });
        },
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          time: {
            unit: 'date',
          },
          ticks: {
            stepSize: 2,
            fontSize: 10,
            fontColor: '#929D9D',
            callback(date: string, i: number) {
              if (i % 3 === 0) {
                return date;
              } else {
                return '';
              }
            },
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#929D9D',
            fontSize: 10,
            padding: 10,
            callback(value: number, i: number) {
              if (i % 2 === 0) {
                return '$' + numToK(value);
              } else {
                return '';
              }
            },
          },
        },
      ],
    },
  };

  return (
    <SwapVolumeContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="home.network.total-vol" />
          </Text>
        </TitleDiv>
        <LineContainer>
          {isLoading && <LoaderComingSoon />}
          <LineDiv isLoading={isLoading}>
            <Line type="line" data={data} options={options} height={110} />
          </LineDiv>
        </LineContainer>
      </Box>
    </SwapVolumeContainer>
  );
};
