import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { IReward } from '../../../../metanodes';
import { IconInfo } from '../../../Common';

import { EarningsContainer, Row } from './styled';

interface Props {
  reward: IReward | null;
  isLoading: boolean;
}

export const Earnings = (props: Props) => {
  const { locale } = useIntl();
  const { reward, isLoading } = props;
  const rewardsTotal = reward ? reward.total : 0;
  const rewardsSwingby = reward ? reward.stakingRewards : 0;
  const rewardsSbBtcUsd = reward ? reward.networkRewards : 0;
  const rewardsAvgPerNode = reward ? reward.avgPerNode : 0;

  const earningTotal = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsTotal));

  const earningSwingbyUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsSwingby));

  const earningSbBtcUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsSbBtcUsd));

  const earningAvr = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsAvgPerNode));

  const loader = <Loader marginTop={0} minHeight={68} />;

  return (
    <EarningsContainer>
      <Row>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.earnings" />
        </Text>
        <Tooltip
          content={
            <Tooltip.Content>
              <Text variant="accent">
                <FormattedMessage id="metanodes.swingby" values={{ value: earningSwingbyUsd }} />
              </Text>
              <br />
              <Text variant="accent">
                <FormattedMessage id="metanodes.sbBTC" values={{ value: earningSbBtcUsd }} />
              </Text>
            </Tooltip.Content>
          }
          data-testid="tooltip"
        >
          <IconInfo />
        </Tooltip>
      </Row>
      {!isLoading ? (
        <>
          <Row>
            <Text variant="title-xs">{earningTotal}</Text>
          </Row>
          <div>
            <Text variant="section-title">
              <FormattedMessage
                id="metanodes.earning-avr"
                values={{
                  earningAvr,
                }}
              />
            </Text>
          </div>
        </>
      ) : (
        loader
      )}
    </EarningsContainer>
  );
};
