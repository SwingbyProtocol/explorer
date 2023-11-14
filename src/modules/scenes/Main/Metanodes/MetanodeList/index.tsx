import { getCryptoAssetFormatter, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { hasFlag } from 'country-flag-icons';
import { DateTime } from 'luxon';
import { rem } from 'polished';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { Node } from '../../../../../generated/graphql';
import { convertDateTime, getDiffDays } from '../../../../explorer';
import {
  getSbBtcRewardCurrency,
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
  metanodes: Node[] | null;
  bridge: SkybridgeBridge;
  isLoading: boolean;
}

export const MetanodeList = (props: Props) => {
  const { locale } = useIntl();
  const { metanodes, bridge, isLoading } = props;
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
          metanodes.map((node: Node, i: number) => {
            const ethAddress = node.rewardsAddress;
            const bondAmount = getCryptoAssetFormatter({
              locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.bondAmount));

            const lockedPortion = (
              <FormattedNumber
                value={Number(node.bondFraction) * 100}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            );

            const dt = DateTime.fromISO(node.bondExpiresAt);
            const expireTimestamp = dt.toSeconds();
            const expireTime = convertDateTime(expireTimestamp);
            const isNoRequiredTooltip =
              xl || node.status === 'CHURNED_IN' || node.status === 'MAY_CHURN_IN';

            return (
              <Row key={node.id} bg={toggleStatusBg(node.status, i)}>
                <ColumnLeft>
                  <Location>
                    <ImgFlag
                      alt={node.ipRegionCode}
                      src={
                        hasFlag(node.ipRegionCode)
                          ? `https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.ipRegionCode}.svg`
                          : 'https://cdn3.iconfinder.com/data/icons/seo-and-internet-marketing-12/512/52-512.png'
                      }
                    />
                    <NodeStatus>
                      <ColumnNodeName>
                        <TextNodeName variant="accent">{node.moniker}</TextNodeName>
                      </ColumnNodeName>
                      <ChurnStatus>
                        <StatusIcon status={toggleStatusIconColor(node.status)} />

                        {isNoRequiredTooltip ? (
                          <TextNodeStatus>
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
                            <TextNodeStatus>
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
                  <TextRoom>{bondAmount}</TextRoom> <TextRoom>({lockedPortion}%)</TextRoom>
                </div>
                <ColumnExpiry>
                  <Column>
                    <TextNowrap>{expireTime}</TextNowrap>
                    <TextNowrap>({getDiffDays(expireTimestamp)})</TextNowrap>
                  </Column>
                </ColumnExpiry>
                <SizeL>
                  <BoxAddress>
                    <RowAddress>
                      <CurrencyColumn>
                        <CurrencyBox>
                          <TextRoom>{sbBTCRewardCurrency}</TextRoom>
                        </CurrencyBox>
                        <TextRoom>:</TextRoom>
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
