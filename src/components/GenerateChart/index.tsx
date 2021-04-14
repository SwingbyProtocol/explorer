import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { formatNum } from '../../modules/common';
import { IChartDate } from '../../modules/explorer';
import { LineBox } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';
import { LoaderComingSoon } from '../LoaderComingSoon';

import { LineContainer } from './styled';

interface Props {
  chart: IChartDate[];
}

export const GenerateChart = (props: Props) => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const intl = useIntl();
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const xl = useMatchMedia({ query: `(min-width: ${rem(media.xl)})` });
  const { chart } = props;

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    return {
      labels:
        chart &&
        chart.map((it) =>
          intl.formatDate(it.at, {
            month: 'short',
            day: 'numeric',
          }),
        ),
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
          data: chart && chart.map((it) => it.amount),
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
            padding: 0,
            callback() {
              return '';
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
