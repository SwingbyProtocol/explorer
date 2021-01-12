import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IconLinkArrow, SeeMoreColumn, SeeMoreRow } from './styled';

export const SeeMore = () => {
  return (
    <SeeMoreRow>
      <SeeMoreColumn>
        {/* Todo: Add click logic */}
        <Text variant="accent">
          <FormattedMessage id="common.see-more" />
        </Text>
        <IconLinkArrow />
      </SeeMoreColumn>
    </SeeMoreRow>
  );
};
