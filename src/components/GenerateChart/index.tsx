import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { convert2Currency, formatNum } from '../../modules/common';
import { LineBox } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';
import { LoaderComingSoon } from '../LoaderComingSoon';

import { LineContainer } from './styled';

export const GenerateChart = () => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { formatDate } = useIntl();
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const usd = useSelector((state) => state.explorer.usd);
  const networkInfos = useSelector((state) => state.explorer.networkInfos);
  const { stats } = networkInfos;
  const { volumes } = stats;
  const intl = useIntl();
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const xl = useMatchMedia({ query: `(min-width: ${rem(media.xl)})` });

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
    layout: {
      padding: 2,
    },
    tooltips: {
      displayColors: false,
      position: 'nearest',
      intersect: false,
      padding: 0,
      callbacks: {
        label: (data) => {
          return intl.formatNumber(data.value, { style: 'currency', currency: 'USD' });
        },
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
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
            fontSize: 8,
            padding: 0,
            callback(value: number, i: number) {
              const num = xl ? 3 : lg ? 2 : 3;
              if (i % num === 0) {
                return '$' + formatNum(value);
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
    <LineContainer>
      {isLoading && <LoaderComingSoon isPlaceholder={false} isSmallWindow={true} />}
      <LineBox isLoading={isLoading}>
        <Line type="line" data={data} options={options} height={110} />
      </LineBox>
    </LineContainer>
  );
};
