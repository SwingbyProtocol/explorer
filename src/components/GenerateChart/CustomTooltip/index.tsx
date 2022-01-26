import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CustomTooltipContainer } from './styled';

export const CustomTooltip = ({ payload }) => {
  const intl = useIntl();
  const data = payload?.[0]?.payload;
  console.log('data', data && data);

  const amount =
    data &&
    intl.formatNumber(payload[0].value, {
      style: 'currency',
      currency: 'USD',
    });

  const at = data && data.at;

  const today = intl.formatDate(new Date(), {
    month: 'short',
    day: 'numeric',
  });

  const count = data && data.count && data.count;

  if (!data) return <></>;

  return (
    <CustomTooltipContainer>
      <Text variant="label">
        {at === today ? <FormattedMessage id="common.latest-24hrs" /> : at}
      </Text>
      <Text variant="label">{amount}</Text>
      {count && (
        <Text variant="label">
          <FormattedMessage id="common.txs" values={{ value: count }} />
        </Text>
      )}
    </CustomTooltipContainer>
  );
};
