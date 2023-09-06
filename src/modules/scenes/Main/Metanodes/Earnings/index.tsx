import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { IRewardV2 } from '../../../../metanodes';
import { IconInfo } from '../../../Common';

import { EarningsContainer, Row } from './styled';

interface Props {
  reward: IRewardV2 | null;
  isLoading: boolean;
}

export const Earnings = (props: Props) => {
  const { locale } = useIntl();
  const { reward, isLoading } = props;
  const rewardsTotal = reward ? reward.total : 0;
  const rewardsSbBtc = reward ? reward.totalSbBtc : 0;

  const earningTotal = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsTotal));

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
                <FormattedMessage id="metanodes.swingby" values={{ value: earningTotal }} />
              </Text>
              <br />
              {/* <Text variant="accent">
                <FormattedMessage id="metanodes.sbBTC" values={{ value: earningSbBtcUsd }} />
              </Text> */}
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
            <Text variant="section-title">{rewardsSbBtc.toFixed(6)} sbBTC</Text>
          </div>
        </>
      ) : (
        loader
      )}
    </EarningsContainer>
  );
};
