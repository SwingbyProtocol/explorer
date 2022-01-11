import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import {
  IPeer,
  IPeerStatusTable,
  listNodeStatus,
  PeerStatus,
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
  nodes: IPeer[] | [];
  isLoading: boolean;
}

export const NodeStatus = (props: Props) => {
  const { nodes, isLoading } = props;
  const nodeStatusTable = nodes && listNodeStatus(nodes);
  const { ChurnedIn, MayChurnIn, MayChurnOutBondTooLow, Migrating } = PeerStatus;

  const churnedInStatus =
    nodeStatusTable && nodeStatusTable.find((it: IPeerStatusTable) => it.status === ChurnedIn);

  const bondLowStatus =
    nodeStatusTable &&
    nodeStatusTable.find((it: IPeerStatusTable) => it.status === MayChurnOutBondTooLow);

  const mayChurnInStatus =
    nodeStatusTable && nodeStatusTable.find((it: IPeerStatusTable) => it.status === MayChurnIn);

  const migratingStatus =
    nodeStatusTable && nodeStatusTable.find((it: IPeerStatusTable) => it.status === Migrating);

  const showNodeStatus = (nodeTable: IPeerStatusTable) => (
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
      table: migratingStatus,
      status: migratingStatus?.status,
      text: 'metanodes.migrating',
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
