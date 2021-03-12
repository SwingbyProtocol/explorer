import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { formatNum } from '../../../../common';
import { TBondHistory } from '../../../../metanodes';

import { Box, LineContainer, LineDiv, TitleDiv, TotalSwingbyBondContainer } from './styled';

interface Props {
  bondHistories: TBondHistory[] | null;
}

export const TotalSwingbyBond = (props: Props) => {
  const { bondHistories } = props;
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { formatDate } = useIntl();
  const intl = useIntl();

  const bondVolumes =
    bondHistories && bondHistories.map((it: TBondHistory) => Number(it.bond).toFixed(0));

  const bondDate =
    bondHistories &&
    bondHistories.map((it: TBondHistory) =>
      formatDate(it.since, {
        month: 'short',
        day: 'numeric',
      }),
    );

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    return {
      labels: bondDate && bondDate.reverse(),
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
          data: bondVolumes && bondVolumes.reverse(),
        },
      ],
    };
  };

  const isLabelShows = (i: number) => i % 3 === 0;

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
            callback: function (date: string, i: number) {
              if (i === 0) {
                return date;
              } else if (i === bondDate.length - 1 && isLabelShows(bondDate.length)) {
                return date;
              } else if (isLabelShows(i)) {
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

  const loader = <Loader marginTop={0} minHeight={128} />;

  return (
    <div>
      <TotalSwingbyBondContainer>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="metanodes.total-swingby-bond" />
          </Text>
        </TitleDiv>
        <Box>
          {/* <TitleDiv>
            <Text variant="section-title">
              <FormattedMessage id="metanodes.total-swingby-bond" />
            </Text>
          </TitleDiv> */}
          {bondHistories ? (
            <LineContainer>
              <LineDiv isLoading={false}>
                <Line type="line" data={data} options={options} height={110} />
              </LineDiv>
            </LineContainer>
          ) : (
            loader
          )}
        </Box>
      </TotalSwingbyBondContainer>
    </div>
  );
};
