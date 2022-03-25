import { getCryptoAssetFormatter, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { hasFlag } from 'country-flag-icons';
import { rem } from 'polished';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { convertDateTime, getDiffDays } from '../../../../explorer';
import {
  IPeer,
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
  nodes: IPeer[] | [];
  bridge: SkybridgeBridge;
  isLoading: boolean;
  nodeTvl: number;
}

export const MetanodeList = (props: Props) => {
  const { locale } = useIntl();
  const { isLoading, nodes, nodeTvl } = props;

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
          nodes &&
          nodes.map((node: IPeer, i: number) => {
            // Todo: Migrate to BEP20 address instead of BEP2 for BSC nodes in the future
            const rewardAddress =
              props.bridge === 'btc_bep20' ? node.rewardsAddress1 : node.stake.address;

            const bondAmount = getCryptoAssetFormatter({
              locale,
              displaySymbol: '',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(node.stake.amount));

            const lockedPortion = (
              <FormattedNumber
                value={(Number(node.stake.amount) / nodeTvl) * 100}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            );

            const expireTime = convertDateTime(node.stake.stakeTime);
            const isNoRequiredTooltip =
              xl || node.status === 'CHURNED_IN' || node.status === 'MAY_CHURN_IN';
            const key = `${i}: ${node.rank}: ${node.id}`;

            return (
              <Row key={key} bg={toggleStatusBg(node.status, i)}>
                <ColumnLeft>
                  <Location>
                    <ImgFlag
                      alt={node.regionCode}
                      src={
                        hasFlag(node.regionCode)
                          ? `https://purecatamphetamine.github.io/country-flag-icons/3x2/${node.regionCode}.svg`
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
                  <TextRoom variant="label">({lockedPortion}%)</TextRoom>
                </div>
                <ColumnExpiry>
                  <Column>
                    <TextNowrap>{expireTime}</TextNowrap>
                    <TextNowrap variant="label">({getDiffDays(node.stake.stakeTime)})</TextNowrap>
                  </Column>
                </ColumnExpiry>
                <SizeL>
                  <BoxAddress>
                    <RowAddress>
                      <ColumnAddress>
                        <AddressP>{rewardAddress}</AddressP>
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
