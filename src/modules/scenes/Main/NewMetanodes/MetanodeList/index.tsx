import { getCryptoAssetFormatter } from '@swingby-protocol/pulsar';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { fetchNodeList, INodesResponse } from '../../../../metanodes';
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
  TextNowrap,
} from './styled';

export const MetanodeList = () => {
  const { locale } = useIntl();
  const [metanodes, setMetanodes] = useState(null);

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeList();
      setMetanodes(nodes);
    })();
  }, []);

  return (
    <MetanodeListContainer>
      <NodeContainer>
        <Row>
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
          metanodes.map((node: INodesResponse, i: number) => {
            const bnbAddress = node.rewardsAddress1;
            const ethAddress = node.rewardsAddress2;
            const bondAmount = getCryptoAssetFormatter({
              locale: locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.stake.amount));

            return (
              <Row key={i}>
                <ColumnLeft>
                  <Location>
                    <ImgFlag
                      alt={node.code}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.code}.svg`}
                    />
                    <NodeStatus>
                      <ColumnNodeName>
                        <TextNodeName variant="accent">{node.moniker}</TextNodeName>
                      </ColumnNodeName>
                      <ChurnStatus>
                        <StatusIcon status="COMPLETED" />
                        <TextRoom variant="label">
                          <FormattedMessage id="metanodes.churned-in" />
                        </TextRoom>
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
                    <TextNowrap>Aug 05, 2021, 14:13</TextNowrap>
                    <TextNowrap variant="label">(232 days)</TextNowrap>
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
