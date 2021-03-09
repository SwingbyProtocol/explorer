import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { IReward } from '../../../../metanodes';

import { EarningsContainer, Row } from './styled';

interface Props {
  reward: IReward | null;
}

export const Earnings = (props: Props) => {
  const { locale } = useIntl();
  const { reward } = props;
  const rewardsTotal = reward ? reward.rewards : 0;
  const rewardsAvgPerNode = reward ? reward.rewardsAvgPerNode : 0;

  const earningTotal = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsTotal));

  const earningAvr = getFiatAssetFormatter({
    locale: locale,
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
      </Row>
      {reward ? (
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
