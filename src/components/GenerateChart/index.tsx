import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { nanoid } from 'nanoid';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { IChartDate } from '../../modules/explorer';
import { LineBox } from '../../modules/scenes/Common';
import { LoaderComingSoon } from '../LoaderComingSoon';
import { formatNum } from '../../modules/common';
import { CustomTooltip } from '../CustomTooltip';

import { LineContainer } from './styled';

interface Props {
  chart: IChartDate[];
  isLoading: boolean;
}

export const GenerateChart = (props: Props) => {
  // Ref: https://github.com/jerairrest/react-chartjs-2/issues/306
  const intl = useIntl();

  const { chart, isLoading } = props;
  const gradientId = useMemo(() => nanoid(), []);

  // const data = (canvas) => {
  //   const ctx = canvas.getContext('2d');
  //   const gradient = ctx.createLinearGradient(0, 0, 0, 140);
  //   gradient.addColorStop(0, '#31D5B8');
  //   gradient.addColorStop(0.8, 'rgba(255,255,255, 0.3)');

  //   return {
  //     labels:
  //       chart &&
  //       chart.map((it) =>
  //         intl.formatDate(it.at, {
  //           month: 'short',
  //           day: 'numeric',
  //         }),
  //       ),
  //     datasets: [
  //       {
  //         fill: 'start',
  //         tension: 0.4,
  //         backgroundColor: gradient,
  //         borderColor: '#31D5B8',
  //         data: chart && chart.map((it) => it.amount),
  //       },
  //     ],
  //   };
  // };

  // const options = {
  //   animation: false,
  //   responsive: true,
  //   pointDotStrokeWidth: 0,
  //   elements: {
  //     point: {
  //       radius: 0,
  //     },
  //   },
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: {
  //       displayColors: false,
  //       position: 'nearest',
  //       intersect: false,
  //       callbacks: {
  //         label: (data) => {
  //           return intl.formatNumber(data.raw, { style: 'currency', currency: 'USD' });
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       display: false,
  //     },

  //     y: {
  //       display: false,
  //     },
  //   },
  // };

  return (
    <>
      <LineContainer>
        {/* {isLoading && <LoaderComingSoon isPlaceholder={false} isSmallWindow={true} />} */}
        {/* <LineBox isLoading={isLoading}> */}
        {/* <Line type="line" data={data} options={options} height={110} /> */}
        {/* <ResponsiveContainer width="100%" height="100%" minHeight={110}> */}
        <ResponsiveContainer width="100%" height={'100%'} minHeight={110}>
          <AreaChart data={chart} width={200} height={110}>
            {/* <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="40%" stopColor="#31D5B8" stopOpacity={1 } />
            <stop offset="100%" stopColor="#31D5B8" stopOpacity={0} />
          </linearGradient>
        </defs>


        <Tooltip content={CustomTooltip} /> */}
            <XAxis dataKey="at" hide={true} />
            <YAxis dataKey="amount" hide={true} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              fill={`url(#${gradientId})`}
              fillOpacity="0.1"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* </LineBox> */}
      </LineContainer>
    </>
  );
};
