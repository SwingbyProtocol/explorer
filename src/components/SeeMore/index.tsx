import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { IconLinkArrow, SeeMoreColumn, SeeMoreRow } from './styled';

export const SeeMore = () => {
  return (
    <SeeMoreRow>
      <SeeMoreColumn>
        {/* Todo: Add click logic */}
        <Text variant="accent">See more</Text>
        <IconLinkArrow />
      </SeeMoreColumn>
    </SeeMoreRow>
  );
};
