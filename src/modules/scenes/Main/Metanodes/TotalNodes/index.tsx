import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import CountUp from 'react-countup';
import { FormattedMessage } from 'react-intl';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';

import { CustomTooltipPie } from '../../../../../components/CustomTooltipPie';
import { Loader } from '../../../../../components/Loader';
import { INodeListResponse } from '../../../../metanodes';
import { TextRoom } from '../../../Common';

import {
  DoughnutWrapper,
  Row,
  RowTitle,
  StatusContainer,
  StatusIcon,
  TextNodeNum,
  TotalNodesContainer,
  StatusIconWithWarningHalf,
} from './styled';

interface Props {
  metanodes: INodeListResponse[] | null;
  isLoading: boolean;
}

const MAX_CHURNED_IN = 50;

const CHURNED_IN_STATUSES = ['churned-in'];
const MAY_CHURNED_OUT_STATUSES = ['may-churn-out--bond-too-low', 'may-churn-out--bond-expiring'];

export const TotalNodes = ({ metanodes: metanodesParam, isLoading }: Props) => {
  const theme = useTheme();
  const metanodes = metanodesParam ?? [];

  const totalNodeCount = metanodes.length;
  const activeNodeCount = metanodes.filter((it) => CHURNED_IN_STATUSES.includes(it.status)).length;
  const mayChurnOutNodeCount = metanodes.filter((it) =>
    MAY_CHURNED_OUT_STATUSES.includes(it.status),
  ).length;
  const notActiveNodeCount = metanodes.filter(
    (it) => ![...CHURNED_IN_STATUSES, ...MAY_CHURNED_OUT_STATUSES].includes(it.status),
  ).length;

  const loader = <Loader marginTop={0} minHeight={288} />;
  const data = [
    { name: 'Not Churned In', value: notActiveNodeCount },
    { name: 'May Churn Out', value: mayChurnOutNodeCount },
    { name: 'Churned In', value: activeNodeCount },
  ];
  const COLORS = [
    theme.pulsar.color.text.masked,
    theme.pulsar.color.warning.normal,
    theme.pulsar.color.primary.normal,
  ];
  return (
    <TotalNodesContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.total-nodes" />
        </Text>
      </RowTitle>
      {!isLoading ? (
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
                    activeNodes: activeNodeCount + mayChurnOutNodeCount,
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
