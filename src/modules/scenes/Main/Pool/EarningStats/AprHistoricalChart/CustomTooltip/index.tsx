import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { CustomTooltipContainer } from './styled';

export const CustomTooltip = ({ payload }) => {
  const intl = useIntl();
  const data = payload?.[0];
  const amount = data && data.value;
  const at =
    data &&
    intl.formatDate(data.payload.timestamp * 1000, {
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
          id="common.percent"
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
