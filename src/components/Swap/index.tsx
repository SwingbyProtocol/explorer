import { Button } from '@swingby-protocol/pulsar';
import { createWidget, getHtml, openPopup } from '@swingby-protocol/widget';
import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { mode } from '../../modules/env';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  const big = useMemo(() => createWidget({ mode, variant: 'big' }), []);
  const banner = useMemo(() => createWidget({ mode, variant: 'banner' }), []);
  const show = useCallback(() => openPopup({ widget: big }), [big]);

  return (
    <>
      <SwapMobileRow>
        <Button variant="primary" size="state" onClick={show} target="_blank">
          <FormattedMessage id="common.swap" />
        </Button>
      </SwapMobileRow>

      <StyledSwap dangerouslySetInnerHTML={{ __html: getHtml({ widget: banner }) }} />
    </>
  );
};
