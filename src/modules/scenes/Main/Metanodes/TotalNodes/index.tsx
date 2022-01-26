import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import CountUp from 'react-countup';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';

import { Loader } from '../../../../../components/Loader';
import { IPeer, PeerStatus } from '../../../../metanodes';
import { TextRoom } from '../../../Common';

import {
  CustomTooltipContainer,
  DoughnutWrapper,
  Row,
  RowTitle,
  StatusContainer,
  StatusIcon,
  StatusIconWithWarningHalf,
  TextNodeNum,
  TotalNodesContainer,
  ColumnTvl,
  NodeTvl,
  ValueUsd,
} from './styled';

interface Props {
  nodes: IPeer[];
  isLoading: boolean;
  nodeTvl: number;
}

const MAX_CHURNED_IN = 50;

const CHURNED_IN_STATUSES = [PeerStatus.ChurnedIn];
const MAY_CHURNED_OUT_STATUSES = [
  PeerStatus.MayChurnOutBondTooLow,
  PeerStatus.MayChurnOutBondExpiring,
];

const MIGRATING_STATUS = [PeerStatus.Migrating];

export const TotalNodes = ({ nodes, isLoading, nodeTvl }: Props) => {
  const theme = useTheme();

  const { locale } = useIntl();
  const usd = useSelector((state) => state.explorer.usd);

  const formattedTvlUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd.SWINGBY * nodeTvl);

  const totalNodeCount = nodes && nodes.length;
  const activeNodeCount =
    nodes && nodes.filter((it) => CHURNED_IN_STATUSES.includes(it.status)).length;
  const migratingNodeCount =
    nodes && nodes.filter((it) => MIGRATING_STATUS.includes(it.status)).length;
  const mayChurnOutNodeCount =
    nodes && nodes.filter((it) => MAY_CHURNED_OUT_STATUSES.includes(it.status)).length;
  const notActiveNodeCount =
    nodes &&
    nodes.filter(
      (it) =>
        ![...CHURNED_IN_STATUSES, ...MIGRATING_STATUS, ...MAY_CHURNED_OUT_STATUSES].includes(
          it.status,
        ),
    ).length;

  const loader = <Loader marginTop={0} minHeight={290} />;

  const data = [
    { name: 'Not Churned In', value: notActiveNodeCount },
    { name: 'May Churn Out', value: mayChurnOutNodeCount },
    { name: 'Churned In', value: activeNodeCount },
    { name: 'Migrating', value: migratingNodeCount },
  ];

  const COLORS = [
    theme.pulsar.color.text.masked,
    theme.pulsar.color.warning.normal,
    theme.pulsar.color.primary.normal,
    theme.pulsar.color.warning.normal,
  ];

  const CustomTooltipPie = ({ payload }) => {
    const data = payload?.[0]?.payload;

    if (!data) return <></>;
    return (
      <CustomTooltipContainer>
        <Text variant="label">
          {data.payload.name}: {data.payload.value}
        </Text>
      </CustomTooltipContainer>
    );
  };

  return (
    <TotalNodesContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.total-nodes" />
        </Text>
      </RowTitle>
      {!isLoading && nodes.length > 0 ? (
        <>
          <DoughnutWrapper>
            <TextNodeNum variant="title-s">
              <CountUp delay={1} end={totalNodeCount} duration={7} />
            </TextNodeNum>

            <ResponsiveContainer width="100%" height="100%" minHeight={210}>
              <PieChart width={210} height={210}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={CustomTooltipPie} />
              </PieChart>
            </ResponsiveContainer>
          </DoughnutWrapper>
          <StatusContainer>
            <Row>
              <StatusIconWithWarningHalf status="COMPLETED" />
              <TextRoom variant="label">
                <FormattedMessage
                  id="metanodes.churned-metanodes"
                  values={{
                    activeNodes: activeNodeCount + mayChurnOutNodeCount + migratingNodeCount,
                    nodeLimits: MAX_CHURNED_IN,
                  }}
                />
              </TextRoom>
            </Row>
            {notActiveNodeCount > 0 && (
              <Row>
                <StatusIcon status="WAITING" />
                <TextRoom variant="label">
                  <FormattedMessage
                    id="metanodes.not-active-metanodes"
                    values={{ notActiveNodes: notActiveNodeCount }}
                  />
                </TextRoom>
              </Row>
            )}
          </StatusContainer>
          <NodeTvl>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.total-nodes-metanodes-tvl" />
            </TextRoom>
            <ColumnTvl>
              <TextRoom variant="label">
                <FormattedMessage
                  id="common.value.swingby"
                  values={{
                    value: (
                      <FormattedNumber
                        value={Number(nodeTvl)}
                        maximumFractionDigits={0}
                        minimumFractionDigits={0}
                      />
                    ),
                  }}
                />
              </TextRoom>
              <ValueUsd>
                <TextRoom variant="label">({formattedTvlUsd})</TextRoom>
              </ValueUsd>
            </ColumnTvl>
          </NodeTvl>
        </>
      ) : (
        loader
      )}
    </TotalNodesContainer>
  );
};
