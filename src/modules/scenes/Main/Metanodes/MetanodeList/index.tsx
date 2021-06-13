import { getCryptoAssetFormatter, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { DateTime } from 'luxon';
import { rem } from 'polished';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { PATH } from '../../../../env';
import { convertDateTime, getDiffDays } from '../../../../explorer';
import { useGetBridgesTvl } from '../../../../hooks';
import {
  getSbBtcRewardCurrency,
  INodeListResponse,
  toggleStatusBg,
  toggleStatusIconColor,
  toggleStatusWord,
} from '../../../../metanodes';
import { StylingConstants } from '../../../../styles';
import { SizeL, TextBlock, TextRoom } from '../../../Common';

import {
  AddressP,
  BoxAddress,
  ChurnStatus,
  Column,
  ColumnAddress,
  ColumnExpiry,
  ColumnLeft,
  ColumnNodeName,
  CurrencyBox,
  CurrencyColumn,
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
  TooltipStatus,
} from './styled';

interface Props {
  metanodes: INodeListResponse[] | null;
  bridge: SkybridgeBridge;
  isLoading: boolean;
}

export const MetanodeList = (props: Props) => {
  const { locale } = useIntl();
  const { metanodes, bridge, isLoading } = props;
  const { tvl } = useGetBridgesTvl(PATH.METANODES);
  const usd = useSelector((state) => state.explorer.usd);
  const tvlUsd = tvl[bridge];
  const swingbyRewardCurrency = 'BEP2';
  const sbBTCRewardCurrency = bridge && getSbBtcRewardCurrency(bridge);

  const { media } = StylingConstants;
  const xl = useMatchMedia({ query: `(min-width: ${rem(media.xl)})` });

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
        {!isLoading &&
          metanodes &&
          metanodes.map((node: INodeListResponse, i: number) => {
            const bnbAddress = node.addresses[0];
            const ethAddress = node.addresses[1];
            const bondAmount = getCryptoAssetFormatter({
              locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.bondAmount));

            const dt = DateTime.fromISO(node.bondExpiresAt);
            const expireTimestamp = dt.toSeconds();
            const expireTime = convertDateTime(expireTimestamp);
            const lockedUsdValue = Number(node.bondAmount) * usd.SWINGBY;
            const lockedPortion = Number((lockedUsdValue / tvlUsd) * 100).toFixed(2);

            const isNoRequiredTooltip =
              xl || node.status === 'churned-in' || node.status === 'may-churn-in';

            return (
              <Row key={node.id} bg={toggleStatusBg(node.status, i)}>
                <ColumnLeft>
                  <Location>
                    <ImgFlag
                      alt={node.regionCode}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.regionCode}.svg`}
                    />
                    <NodeStatus>
                      <ColumnNodeName>
                        <TextNodeName variant="accent">{node.moniker}</TextNodeName>
                      </ColumnNodeName>
                      <ChurnStatus>
                        <StatusIcon status={toggleStatusIconColor(node.status)} />

                        {isNoRequiredTooltip ? (
                          <TextNodeStatus variant="label">
                            <FormattedMessage id={toggleStatusWord(node.status) as string} />
                          </TextNodeStatus>
                        ) : (
                          <TooltipStatus
                            content={
                              <Tooltip.Content>
                                <FormattedMessage id={toggleStatusWord(node.status) as string} />
                              </Tooltip.Content>
                            }
                            targetHtmlTag="span"
                          >
                            <TextNodeStatus variant="label">
                              <FormattedMessage id={toggleStatusWord(node.status) as string} />
                            </TextNodeStatus>
                          </TooltipStatus>
                        )}
                      </ChurnStatus>
                    </NodeStatus>
                  </Location>
                </ColumnLeft>
                <SizeL>
                  <TextRoom>{node.version}</TextRoom>
                </SizeL>
                <div>
                  <TextRoom>{bondAmount}</TextRoom>{' '}
                  {tvlUsd > 0 && <TextRoom variant="label">({lockedPortion}%)</TextRoom>}
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
                      <CurrencyColumn>
                        <CurrencyBox>
                          <TextRoom variant="label">{swingbyRewardCurrency}</TextRoom>
                        </CurrencyBox>
                        <TextRoom variant="label">:</TextRoom>
                      </CurrencyColumn>
                      <ColumnAddress>
                        <AddressP>{bnbAddress}</AddressP>
                      </ColumnAddress>
                    </RowAddress>
                    <RowAddress>
                      <CurrencyColumn>
                        <CurrencyBox>
                          <TextRoom variant="label">{sbBTCRewardCurrency}</TextRoom>
                        </CurrencyBox>
                        <TextRoom variant="label">:</TextRoom>
                      </CurrencyColumn>
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
