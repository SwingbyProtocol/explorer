import { Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { IStats } from '../../../../explorer';

import { AllVolumeSpan, SwapVolumeContainer, TitleDiv } from './styled';

interface Props {
  stats: IStats;
}

export const SwapVolume = (props: Props) => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { stats } = props;
  const { volumes } = stats;

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');
    const today = DateTime.local();

    // Memo: Cannot pass the `FormattedDate(react-intl)` into labels
    return {
      labels: [
        today.minus({ days: 6 }).toFormat('MMM d'),
        '',
        '',
        today.minus({ days: 3 }).toFormat('MMM d'),
        '',
        '',
        today.toFormat('MMM d'),
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
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 2,
            padding: 10,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <SwapVolumeContainer>
      <TitleDiv>
        <Text variant="section-title">Total Swap Vol. 7d</Text>
        <AllVolumeSpan variant="accent">See More</AllVolumeSpan>
      </TitleDiv>
      <Line type="line" data={data} options={options} height={110} />
    </SwapVolumeContainer>
  );
};
