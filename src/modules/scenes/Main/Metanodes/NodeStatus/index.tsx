import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import {
  churnedIn,
  INodeListResponse,
  INodeStatusTable,
  listNodeStatus,
  bondTooLow,
  bondExpiring,
  mayChurnIn,
} from '../../../../metanodes';
import { TextRoom } from '../../../Common';

import {
  ColumnStatus,
  Left,
  NodeStatusContainer,
  Right,
  Row,
  RowTitle,
  StatusIcon,
  TextNodeQty,
} from './styled';

interface Props {
  metanodes: INodeListResponse[] | null;
}

export const NodeStatus = (props: Props) => {
  const { metanodes } = props;
  const nodeStatusTable = metanodes && listNodeStatus(metanodes);

  const churnedInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === churnedIn);

  const bondTooLowStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === bondTooLow);

  const bondExpiringStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === bondExpiring);

  const mayChurnInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === mayChurnIn);

  const showNodeStatus = (nodeTable: INodeStatusTable) => (
    <Tooltip
      content={
        <Tooltip.Content>
          {nodeTable.nodes.map((node: string) => (
            <>
              <TextRoom variant="label">{node},</TextRoom>{' '}
            </>
          ))}
        </Tooltip.Content>
      }
      targetHtmlTag="span"
    >
      <TextNodeQty variant="label">{nodeTable.nodeQty}</TextNodeQty>
    </Tooltip>
  );

  const loader = <Loader marginTop={0} minHeight={0} />;
  return (
    <NodeStatusContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.metanode-status" />
        </Text>
      </RowTitle>
      {metanodes ? (
        <>
          <Row>
            <Left>
              <ColumnStatus>
                <StatusIcon status="COMPLETED" />
                <TextRoom variant="label">Churned in</TextRoom>
              </ColumnStatus>
            </Left>
            <Right>{showNodeStatus(churnedInStatus)}</Right>
          </Row>
          <Row>
            <Left>
              <ColumnStatus>
                <StatusIcon status="WAITING" />
                <TextRoom variant="label">May churn in</TextRoom>
              </ColumnStatus>
            </Left>
            <Right>{showNodeStatus(mayChurnInStatus)}</Right>
          </Row>
          <Row>
            <Left>
              <ColumnStatus>
                <StatusIcon status="PENDING" />
                <TextRoom variant="label">Bond expiring</TextRoom>
              </ColumnStatus>
            </Left>
            <Right>{showNodeStatus(bondExpiringStatus)}</Right>
          </Row>
          <Row>
            <Left>
              <ColumnStatus>
                <StatusIcon status="REFUNDED" />
                <TextRoom variant="label">Bond too low</TextRoom>
              </ColumnStatus>
            </Left>
            <Right>{showNodeStatus(bondTooLowStatus)}</Right>
          </Row>
        </>
      ) : (
        loader
      )}
    </NodeStatusContainer>
  );
};
