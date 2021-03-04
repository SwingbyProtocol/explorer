import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { EarningsContainer, Row } from './styled';

export const Earnings = () => {
  const { locale } = useIntl();
  const earning = 128130;
  const node = 50;
  const earningTotal = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(earning);

  const earningAvr = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(earning / node);

  return (
    <EarningsContainer>
      <Row>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.earnings" />
        </Text>
      </Row>
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
    </EarningsContainer>
  );
};
