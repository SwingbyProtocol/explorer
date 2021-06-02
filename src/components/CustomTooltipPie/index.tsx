import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { CustomTooltipContainer } from './styled';

export const CustomTooltipPie = ({ payload }) => {
  const data = payload?.[0]?.payload;

  if (!data) return <></>;
  return (
    <CustomTooltipContainer>
      <Text variant="label">
        {data.payload.name}: {data.payload.value}
      </Text>
    </CustomTooltipContainer>
  );
};
