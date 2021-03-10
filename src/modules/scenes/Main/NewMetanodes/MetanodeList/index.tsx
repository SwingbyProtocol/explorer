import { getCryptoAssetFormatter } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';
import { DateTime } from 'luxon';

import { convertDateTime, getDiffDays } from '../../../../explorer';
import { INodeListResponse, toggleStatusBg, toggleStatusIconColor } from '../../../../metanodes';
import { AddressLinkP, SizeL, TextBlock, TextRoom } from '../../../Common';

import {
  BoxAddress,
  ChurnStatus,
  Column,
  ColumnAddress,
  ColumnExpiry,
  ColumnLeft,
  ColumnNodeName,
  ImgFlag,
  Location,
  MetanodeListContainer,
  NodeContainer,
  NodeStatus,
  Row,
  RowAddress,
  StatusIcon,
  TextNodeName,
  TextNodeStatus,
  TextNowrap,
} from './styled';

interface Props {
  metanodes: INodeListResponse[] | null;
}

export const MetanodeList = (props: Props) => {
  const { locale } = useIntl();
  const { metanodes } = props;

  return (
    <MetanodeListContainer>
      <NodeContainer>
        <Row bg>
          <ColumnLeft>
            <TextBlock variant="section-title">
              <FormattedMessage id="metanodes.metanodes" />
            </TextBlock>
          </ColumnLeft>
          <SizeL>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.version" />
            </TextRoom>
          </SizeL>
          <TextRoom variant="label">
            <FormattedMessage id="metanodes.bond" />
          </TextRoom>
          <ColumnExpiry>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.bond-expiry" />
            </TextRoom>
          </ColumnExpiry>
          <SizeL>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.address" />
            </TextRoom>
          </SizeL>
        </Row>
        {metanodes &&
          metanodes.map((node: INodeListResponse, i: number) => {
            const bnbAddress = node.addresses[0];
            const ethAddress = node.addresses[1];
            const bondAmount = getCryptoAssetFormatter({
              locale: locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.stake.amount));

            const dt = DateTime.fromISO(node.stake.expiresAt);
            const expireTimestamp = dt.toSeconds();
            const expireTime = convertDateTime(expireTimestamp);

            return (
              <Row key={node.id} bg={toggleStatusBg(node.status, i)}>
                <ColumnLeft>
                  <Location>
                    <ImgFlag
                      alt={node.ip.regionCode}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.ip.regionCode}.svg`}
                    />
                    <NodeStatus>
                      <ColumnNodeName>
                        <TextNodeName variant="accent">{node.moniker}</TextNodeName>
                      </ColumnNodeName>
                      <ChurnStatus>
                        <StatusIcon status={toggleStatusIconColor(node.status)} />
                        <TextNodeStatus variant="label">{node.status}</TextNodeStatus>
                      </ChurnStatus>
                    </NodeStatus>
                  </Location>
                </ColumnLeft>
                <SizeL>
                  <TextRoom>{node.version}</TextRoom>
                </SizeL>
                <div>
                  <TextRoom>{bondAmount}</TextRoom> <TextRoom variant="label">(12.23%)</TextRoom>
                </div>
                <ColumnExpiry>
                  <Column>
                    <TextNowrap>{expireTime}</TextNowrap>
                    <TextNowrap variant="label">({getDiffDays(expireTimestamp)})</TextNowrap>
                  </Column>
                </ColumnExpiry>
                <SizeL>
                  <BoxAddress>
                    <RowAddress>
                      <div>
                        <TextRoom variant="label">BNB:</TextRoom>
                      </div>
                      <ColumnAddress>
                        <AddressLinkP>{bnbAddress}</AddressLinkP>
                      </ColumnAddress>
                    </RowAddress>
                    <RowAddress>
                      <div>
                        <TextRoom variant="label">ETH:</TextRoom>
                      </div>
                      <ColumnAddress>
                        <AddressLinkP>{ethAddress}</AddressLinkP>
                      </ColumnAddress>
                    </RowAddress>
                  </BoxAddress>
                </SizeL>
              </Row>
            );
          })}
      </NodeContainer>
    </MetanodeListContainer>
  );
};
