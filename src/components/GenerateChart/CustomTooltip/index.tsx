import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';

import { CustomTooltipContainer } from './styled';

export const CustomTooltip = ({ payload }) => {
  const intl = useIntl();
  const data = payload?.[0]?.payload;

  const amount =
    data &&
    intl.formatNumber(payload[0].value, {
      style: 'currency',
      currency: 'USD',
    });

  const at =
    data &&
    intl.formatDate(data.at, {
      month: 'short',
      day: 'numeric',
    });

  if (!data) return <></>;

  return (
    <CustomTooltipContainer>
      <Text variant="label">{at}</Text>
      <Text variant="label">{amount}</Text>
    </CustomTooltipContainer>
  );
};
