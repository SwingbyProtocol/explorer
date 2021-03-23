import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { TStatus } from '../../../../explorer';
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

  const metanodeStatusTable = [
    {
      status: churnedInStatus,
      iconStatus: 'COMPLETED',
      text: 'metanodes.metanode-status.churned-in',
    },
    {
      status: mayChurnInStatus,
      iconStatus: 'WAITING',
      text: 'metanodes.may-churn-in',
    },
    {
      status: bondExpiringStatus,
      iconStatus: 'PENDING',
      text: 'metanodes.bond-expiring',
    },
    {
      status: bondTooLowStatus,
      iconStatus: 'REFUNDED',
      text: 'metanodes.bond-too-low',
    },
  ];
  return (
    <NodeStatusContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.metanode-status" />
        </Text>
      </RowTitle>
      {metanodes ? (
        <>
          {metanodeStatusTable.map(
            (it) =>
              it.status && (
                <Row>
                  <Left>
                    <ColumnStatus>
                      <StatusIcon status={it.iconStatus as TStatus} />
                      <TextRoom variant="label">
                        <FormattedMessage id={it.text} />
                      </TextRoom>
                    </ColumnStatus>
                  </Left>
                  <Right>{showNodeStatus(it.status)}</Right>
                </Row>
              ),
          )}
        </>
      ) : (
        loader
      )}
    </NodeStatusContainer>
  );
};
