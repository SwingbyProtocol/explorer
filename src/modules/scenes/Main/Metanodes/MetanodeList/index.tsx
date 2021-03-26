import { getCryptoAssetFormatter } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';
import { DateTime } from 'luxon';
import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { convertDateTime, getDiffDays } from '../../../../explorer';
import {
  getSbBtcRewardCurrency,
  INodeListResponse,
  toggleStatusBg,
  toggleStatusIconColor,
  toggleStatusWord,
  calTvl,
} from '../../../../metanodes';
import { SizeL, TextBlock, TextRoom } from '../../../Common';

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
  AddressP,
} from './styled';

interface Props {
  metanodes: INodeListResponse[] | null;
  bridge: SkybridgeBridge;
}

export const MetanodeList = (props: Props) => {
  const { locale } = useIntl();
  const { metanodes, bridge } = props;
  const tvl = metanodes && calTvl(metanodes);

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
              locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.stake.amount));

            const dt = DateTime.fromISO(node.stake.expiresAt);
            const expireTimestamp = dt.toSeconds();
            const expireTime = convertDateTime(expireTimestamp);
            const lockedPortion = Number((Number(node.stake.amount) / tvl) * 100).toFixed(2);

            const swingbyRewardCurrency = 'BNB';
            const sbBTCRewardCurrency = bridge && getSbBtcRewardCurrency(bridge);

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
                        <TextNodeStatus variant="label">
                          <FormattedMessage id={toggleStatusWord(node.status) as string} />
                        </TextNodeStatus>
                      </ChurnStatus>
                    </NodeStatus>
                  </Location>
                </ColumnLeft>
                <SizeL>
                  <TextRoom>{node.version}</TextRoom>
                </SizeL>
                <div>
                  <TextRoom>{bondAmount}</TextRoom>{' '}
                  <TextRoom variant="label">({lockedPortion}%)</TextRoom>
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
                        <TextRoom variant="label">{swingbyRewardCurrency}:</TextRoom>
                      </div>
                      <ColumnAddress>
                        <AddressP>{bnbAddress}</AddressP>
                      </ColumnAddress>
                    </RowAddress>
                    <RowAddress>
                      <div>
                        <TextRoom variant="label">{sbBTCRewardCurrency}:</TextRoom>
                      </div>
                      <ColumnAddress>
                        <AddressP>{ethAddress}</AddressP>
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
