import { FormattedMessage } from 'react-intl';

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
  const bnbAddress = 'bnb139kcljy2z6rmx20hkxg5smvzpqnjgqytbqwn90';
  const ethAddress = '0x139kcljy2z6rmx20hkxg5smvzpqnjgqytbqwn90';
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
        <Row>
          <ColumnLeft>
            <Location>
              <ImgFlag
                alt="test"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`}
                // alt={node.code}
                // src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.code}.svg`}
              />
              <NodeStatus>
                <ColumnNodeName>
                  <TextNodeName variant="accent">Stakebooorg</TextNodeName>
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
            <TextRoom>0.1.1</TextRoom>
          </SizeL>
          <div>
            <TextRoom>1,232,122</TextRoom>
            <TextRoom variant="label">(12.23%)</TextRoom>
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
      </NodeContainer>
    </MetanodeListContainer>
  );
};
