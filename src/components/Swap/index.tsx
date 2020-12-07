import { Button } from '@swingby-protocol/pulsar';
import { createWidget, getHtml, openPopup } from '@swingby-protocol/widget';
import { useCallback, useMemo } from 'react';

import { NETWORK, NETWORK_MODE } from '../../modules/env';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  const widget = useMemo(
    () =>
      createWidget({
        mode: NETWORK === NETWORK_MODE.TESTNET ? 'test' : 'production',
        variant: 'banner',
      }),
    [],
  );

  const show = useCallback(() => openPopup({ widget }), [widget]);

  return (
    <>
      <SwapMobileRow>
        <Button variant="primary" size="state" onClick={show} target="_blank">
          Swap
        </Button>
      </SwapMobileRow>

      <StyledSwap dangerouslySetInnerHTML={{ __html: getHtml({ widget }) }} />
    </>
  );
};
