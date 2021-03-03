import { Text } from '@swingby-protocol/pulsar';
import { Doughnut } from 'react-chartjs-2';
import { FormattedMessage } from 'react-intl';

import { TextRoom } from '../../../Common';

import {
  DoughnutWrapper,
  Row,
  RowTitle,
  StatusContainer,
  StatusIcon,
  TextNodeNum,
  TotalNodesContainer,
} from './styled';

export const TotalNodes = () => {
  const data = {
    labels: ['Bond Too Low', 'Churned In'],
    datasets: [
      {
        data: [5, 50],
        backgroundColor: ['#A8B3C3', '#31D5B8'],
        hoverBackgroundColor: ['#A8B3C3', '#31D5B8'],
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    elements: {
      display: true,
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 80,
  };

  const nodeLimits = 50;
  const totalNodes = 55;
  const activeNodes = totalNodes > nodeLimits ? nodeLimits : totalNodes;
  const notActiveNode = totalNodes > nodeLimits && totalNodes - nodeLimits;

  return (
    <TotalNodesContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.total-nodes" />
        </Text>
      </RowTitle>
      <DoughnutWrapper>
        <TextNodeNum variant="title-s">{totalNodes}</TextNodeNum>
        <Doughnut data={data} options={options} width={70} height={70} />
      </DoughnutWrapper>
      <StatusContainer>
        <Row>
          <StatusIcon status="COMPLETED" />
          <TextRoom variant="label">
            <FormattedMessage
              id="metanodes.churned-metanodes"
              values={{
                activeNodes,
                nodeLimits,
              }}
            />
          </TextRoom>
        </Row>
        {notActiveNode && (
          <Row>
            <StatusIcon status="WAITING" />
            <TextRoom variant="label">
              <FormattedMessage
                id="metanodes.not-active-metanodes"
                values={{
                  notActiveNode,
                }}
              />
            </TextRoom>
          </Row>
        )}
      </StatusContainer>
    </TotalNodesContainer>
  );
};
