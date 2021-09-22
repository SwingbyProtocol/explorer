import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { CustomTooltipContainer } from './styled';

export const CustomTooltip = ({ payload }) => {
  const intl = useIntl();
  const data = payload?.[0]?.payload;

  const amount = data && payload[0].value;

  const at =
    data &&
    intl.formatDate(data.timestamp * 1000, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  if (!data) return <></>;

  return (
    <CustomTooltipContainer>
      <Text variant="label">{at}</Text>
      <Text variant="label">
        <FormattedMessage
          id="common.value.swingby"
          values={{
            value: (
              <FormattedNumber value={amount} maximumFractionDigits={2} minimumFractionDigits={0} />
            ),
          }}
        />
      </Text>
    </CustomTooltipContainer>
  );
};
