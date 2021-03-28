import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import {
  churnedIn,
  INodeListResponse,
  INodeStatusTable,
  listNodeStatus,
  bondLow,
  bondExpiring,
  mayChurnIn,
  inactiveBondExpired,
  inactiveBondTooLow,
  toggleStatusIconColor,
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
  isLoading: boolean;
}

export const NodeStatus = (props: Props) => {
  const { metanodes, isLoading } = props;
  const nodeStatusTable = metanodes && listNodeStatus(metanodes);

  const churnedInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === churnedIn);

  const bondLowStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === bondLow);

  const bondExpiringStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === bondExpiring);

  const mayChurnInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === mayChurnIn);

  const inactiveBondExpiredStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === inactiveBondExpired);

  const inactiveBondTooLowStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === inactiveBondTooLow);

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
      table: churnedInStatus,
      status: churnedInStatus?.status,
      text: 'metanodes.metanode-status.churned-in',
    },
    {
      table: mayChurnInStatus,
      status: mayChurnInStatus?.status,
      text: 'metanodes.may-churn-in',
    },
    {
      table: bondLowStatus,
      status: bondLowStatus?.status,
      text: 'metanodes.bond-low',
    },
    {
      table: bondExpiringStatus,
      status: bondExpiringStatus?.status,
      text: 'metanodes.bond-expiring',
    },
    {
      table: inactiveBondExpiredStatus,
      status: inactiveBondExpiredStatus?.status,
      text: 'metanodes.inactive-bond-expired',
    },
    {
      table: inactiveBondTooLowStatus,
      status: inactiveBondTooLowStatus?.status,
      text: 'metanodes.inactive-bond-too-low',
    },
  ];
  return (
    <NodeStatusContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.metanode-status" />
        </Text>
      </RowTitle>
      {!isLoading ? (
        <>
          {metanodeStatusTable.map(
            (it) =>
              it.table && (
                <Row>
                  <Left>
                    <ColumnStatus>
                      <StatusIcon status={toggleStatusIconColor(it.status)} />
                      <TextRoom variant="label">
                        <FormattedMessage id={it.text} />
                      </TextRoom>
                    </ColumnStatus>
                  </Left>
                  <Right>{showNodeStatus(it.table)}</Right>
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
