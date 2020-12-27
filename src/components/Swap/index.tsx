import { Button } from '@swingby-protocol/pulsar';
import { createWidget, getHtml, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { mode } from '../../modules/env';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  const explorer = useSelector((state) => state.explorer);
  const { themeMode } = explorer;
  const { locale } = useRouter();

  const big = useMemo(
    () =>
      createWidget({
        resource: 'swap',
        mode,
        size: 'big',
        theme: themeMode,
        locale,
      }),
    [themeMode, locale],
  );

  const banner = useMemo(
    () => createWidget({ resource: 'swap', mode, size: 'banner', theme: themeMode, locale }),
    [themeMode, locale],
  );

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
