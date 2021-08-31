import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { Node } from '../../../../../generated/graphql';
import {
  ChurnedIn,
  listNodeStatus,
  toggleStatusIconColor,
  INodeStatusTable,
  InactiveBondExpired,
  InactiveBondTooLow,
  MayChurnIn,
  MayChurnOutBondExpiring,
  MayChurnOutBondTooLow,
  Unreachable,
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
  metanodes: Node[] | null;
  isLoading: boolean;
}

export const NodeStatus = (props: Props) => {
  const { metanodes, isLoading } = props;
  const nodeStatusTable = metanodes && listNodeStatus(metanodes);

  const churnedInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === ChurnedIn);

  const bondLowStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === MayChurnOutBondTooLow);

  const bondExpiringStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === MayChurnOutBondExpiring);

  const mayChurnInStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === MayChurnIn);

  const inactiveBondExpiredStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === InactiveBondExpired);

  const inactiveBondTooLowStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: INodeStatusTable) => it.status === InactiveBondTooLow);

  const unreachableStatus =
    nodeStatusTable && nodeStatusTable.find((it: INodeStatusTable) => it.status === Unreachable);

  const showNodeStatus = (nodeTable: INodeStatusTable) => (
    <Tooltip
      content={
        <Tooltip.Content>
          {nodeTable.nodes.map((node: string) => (
            <div key={node}>
              <TextRoom variant="label">{node},</TextRoom>{' '}
            </div>
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
    {
      table: unreachableStatus,
      status: unreachableStatus?.status,
      text: 'metanodes.unreachable',
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
            (it, i) =>
              it.table && (
                <Row key={i}>
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
