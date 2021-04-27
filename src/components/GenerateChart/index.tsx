import React from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { IChartDate } from '../../modules/explorer';
import { LineBox } from '../../modules/scenes/Common';
import { LoaderComingSoon } from '../LoaderComingSoon';

import { LineContainer } from './styled';

interface Props {
  chart: IChartDate[];
}

export const GenerateChart = (props: Props) => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const intl = useIntl();

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
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        position: 'nearest',
        intersect: false,
        callbacks: {
          label: (data) => {
            return intl.formatNumber(data.raw, { style: 'currency', currency: 'USD' });
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },

      y: {
        display: false,
      },
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
