import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import CountUp from 'react-countup';
import { FormattedMessage } from 'react-intl';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';

import { Loader } from '../../../../../components/Loader';
import { Node, NodeStatus } from '../../../../../generated/graphql';
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
} from './styled';

interface Props {
  metanodes: Node[] | null;
  isLoading: boolean;
}

const MAX_CHURNED_IN = 50;

const CHURNED_IN_STATUSES = [NodeStatus.ChurnedIn];
const MAY_CHURNED_OUT_STATUSES = [
  NodeStatus.MayChurnOutBondTooLow,
  // NodeStatus.MayChurnOutBondExpiring,
];

const MIGRATING_STATUS = [NodeStatus.MayChurnOutBondExpiring];

export const TotalNodes = ({ metanodes: metanodesParam, isLoading }: Props) => {
  const theme = useTheme();
  const metanodes = metanodesParam ?? [];

  const totalNodeCount = metanodes && metanodes.length;
  const activeNodeCount =
    metanodes && metanodes.filter((it) => CHURNED_IN_STATUSES.includes(it.status)).length;
  const migratingNodeCount =
    metanodes && metanodes.filter((it) => MIGRATING_STATUS.includes(it.status)).length;
  const mayChurnOutNodeCount =
    metanodes && metanodes.filter((it) => MAY_CHURNED_OUT_STATUSES.includes(it.status)).length;
  const notActiveNodeCount =
    metanodes &&
    metanodes.filter(
      (it) =>
        ![...CHURNED_IN_STATUSES, ...MIGRATING_STATUS, ...MAY_CHURNED_OUT_STATUSES].includes(
          it.status,
        ),
    ).length;

  const loader = <Loader marginTop={0} minHeight={288} />;

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
      {!isLoading && metanodes.length > 0 ? (
        <>
          <DoughnutWrapper>
            <TextNodeNum variant="title-s">
              <CountUp delay={1} end={totalNodeCount} duration={7} />
            </TextNodeNum>

            <ResponsiveContainer width="100%" height="100%" minHeight={190}>
              <PieChart width={190} height={190}>
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
        </>
      ) : (
        loader
      )}
    </TotalNodesContainer>
  );
};
