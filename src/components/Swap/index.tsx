import { Button } from '@swingby-protocol/pulsar';

import { swapUrl } from '../../modules/env';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  return (
    <>
      <SwapMobileRow>
        <Button variant="primary" size="state">
          Swap
        </Button>
      </SwapMobileRow>

      <StyledSwap as="iframe" title="Swap" src={swapUrl} />
    </>
  );
};
