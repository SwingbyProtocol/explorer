import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonScaleNarrow } from '../../modules/scenes/Common';
import { SwapRewardsModal } from '../SwapRewardsModal';

export const SwapRewardsButton = () => {
  const [isRewardsModel, setIsRewardsModel] = useState<boolean>(false);

  return (
    <>
      <SwapRewardsModal open={isRewardsModel} onClose={() => setIsRewardsModel(false)} />
      <ButtonScaleNarrow
        variant="primary"
        size="street"
        shape="fill"
        onClick={() => setIsRewardsModel(true)}
      >
        <FormattedMessage id="home.recent-swaps.swap-rewards" />
      </ButtonScaleNarrow>
    </>
  );
};
