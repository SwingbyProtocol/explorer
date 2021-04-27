import { Text } from '@swingby-protocol/pulsar';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';

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

const DOUGHNUT_OPTIONS = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    display: true,
    arc: {
      borderWidth: 0,
    },
  },
  cutout: 80,
};

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

  const data = {
    labels: ['Not Churned In', 'May Churn Out', 'Churned In'],
    datasets: [
      {
        data: [notActiveNodeCount, mayChurnOutNodeCount, activeNodeCount],
        backgroundColor: [
          theme.pulsar.color.text.masked,
          theme.pulsar.color.warning.normal,
          theme.pulsar.color.primary.normal,
        ],
      },
    ],
  };

  const loader = <Loader marginTop={0} minHeight={288} />;

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
            <Doughnut
              type="doughnut"
              data={data}
              options={DOUGHNUT_OPTIONS}
              width={70}
              height={70}
            />
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
