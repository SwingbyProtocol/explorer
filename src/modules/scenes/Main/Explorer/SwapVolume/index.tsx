import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { convert2Currency, numToK } from '../../../../common';
import { IStats } from '../../../../explorer';
import { networkInfos } from '../../../../store/explorer';

import { Box, LineContainer, LineDiv, SwapVolumeContainer, TitleDiv } from './styled';

interface Props {
  stats: IStats;
}

export const SwapVolume = (props: Props) => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { stats } = props;
  const { volumes } = stats;
  const { formatDate } = useIntl();
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const [loading, setLoading] = useState(true);
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
          // label: 'USD',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: 'white',
          pointBorderWidth: 1,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
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
            callback: function (date: string, i: number) {
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
            callback: function (value: number, i: number) {
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

  useEffect(() => {
    if (volumes !== networkInfos.stats.volumes) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [volumes]);

  return (
    <SwapVolumeContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="home.network.totalSwapVol" />
          </Text>
        </TitleDiv>
        <LineContainer>
          {loading && <LoaderComingSoon />}
          <LineDiv isLoading={loading}>
            <Line type="line" data={data} options={options} height={110} />
          </LineDiv>
        </LineContainer>
      </Box>
    </SwapVolumeContainer>
  );
};
