import { FormattedMessage } from 'react-intl';

import { SizeL, SizeS, TextBlock, TextRoom } from '../../../Common';

import {
  ColumnLeft,
  Column,
  ImgFlag,
  MetanodeListContainer,
  NodeContainer,
  Row,
  Location,
  NodeStatus,
  ChurnStatus,
  StatusIcon,
  TextNowrap,
} from './styled';

export const MetanodeList = () => {
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
          <SizeS>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.bond-expiry" />
            </TextRoom>
          </SizeS>
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
                <TextBlock variant="accent">Stakebooorg</TextBlock>
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
          <SizeS>
            <Column>
              <TextNowrap>Aug 05, 2021, 14:13</TextNowrap>
              <TextNowrap variant="label">(232 days)</TextNowrap>
            </Column>
          </SizeS>
          <SizeL>
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.address" />
            </TextRoom>
          </SizeL>
        </Row>
      </NodeContainer>
    </MetanodeListContainer>
  );
};
