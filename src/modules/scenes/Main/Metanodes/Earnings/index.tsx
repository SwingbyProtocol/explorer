import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { IRewards } from '../../../../metanodes';

import { EarningsContainer, Row } from './styled';

interface Props {
  rewards: IRewards | null;
  isLoading: boolean;
}

export const Earnings = (props: Props) => {
  const { locale } = useIntl();
  const { rewards, isLoading } = props;
  const rewardsUsd = rewards ? rewards.weeklyRewardsUsd : 0;
  const rewardsAvgPerNode = rewards ? rewards.average : 0;

  const earningSwingbyUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rewardsUsd);

  const earningAvr = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rewardsAvgPerNode);

  const loader = <Loader marginTop={0} minHeight={68} />;

  return (
    <EarningsContainer>
      <Row>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.earnings" />
        </Text>
      </Row>
      {!isLoading ? (
        <>
          <Row>
            <Text variant="title-xs">{earningSwingbyUsd}</Text>
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
