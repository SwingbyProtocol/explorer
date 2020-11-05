import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { SwapVolumeContainer, TitleDiv } from './styled';

const SwapVolume = (): JSX.Element => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    return {
      labels: ['Oct 3', '', '', 'Oct 6', '', '', 'Oct 9'],
      datasets: [
        {
          fill: 'start',

          backgroundColor: gradient,
          borderColor: '#31D5B8',
          data: [800, 1200, 1000, 900, 1400, 1500, 1300],
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
            stepSize: 500,
            padding: 10,
            labelString: 'K',
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
      </TitleDiv>
      <Line type="line" data={data} options={options} height={110} />
    </SwapVolumeContainer>
  );
};

export default SwapVolume;
