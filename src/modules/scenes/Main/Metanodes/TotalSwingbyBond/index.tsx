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
  isLoading: boolean;
}

export const TotalSwingbyBond = (props: Props) => {
  const { bondHistories, isLoading } = props;
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const { formatDate } = useIntl();
  const intl = useIntl();

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#31D5B8');
    gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

    return {
      datasets: [
        {
          fill: 'start',
          tension: 0.4,
          backgroundColor: gradient,
          borderColor: '#31D5B8',
          data: bondHistories && bondHistories.reverse(),
        },
      ],
    };
  };

  const isLabelShows = (i: number) => i % 3 === 0;

  const options = {
    animation: false,
    parsing: {
      xAxisKey: 'since',
      yAxisKey: 'bond',
    },
    responsive: true,
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
          title: (data) => {
            const since = formatDate(data[0].label, {
              month: 'short',
              day: 'numeric',
            });
            return since;
          },
          label: (data) => {
            return intl.formatNumber(data.raw.bond, { style: 'currency', currency: 'USD' });
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 2,
          font: 10,
          color: '#929D9D',
          callback(label: string, i: number) {
            const value = formatDate(this.getLabelForValue(label), {
              month: 'short',
              day: 'numeric',
            });
            if (i === 0) {
              return value;
            } else if (i === bondHistories.length - 1 && isLabelShows(bondHistories.length)) {
              return value;
            } else if (isLabelShows(i)) {
              return value;
            } else {
              return null;
            }
          },
        },
      },

      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#929D9D',
          font: 10,
          padding: 0,
          callback(value: number, i: number) {
            if (i % 2 === 0) {
              return '$' + formatNum(value);
            } else {
              return '';
            }
          },
        },
      },
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
          {!isLoading ? (
            <LineContainer>
              <LineDiv isLoading={isLoading}>
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
