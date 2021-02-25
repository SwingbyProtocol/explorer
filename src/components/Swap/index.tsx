import { Button } from '@swingby-protocol/pulsar';
import { createWidget, getHtml, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAffiliateCode } from '../../modules/affiliate-code';
import { mode } from '../../modules/env';
import { useThemeSettings } from '../../modules/store/settings';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  const { locale } = useRouter();
  const affiliateCode = useAffiliateCode();
  const [theme] = useThemeSettings();

  const big = useMemo(
    () =>
      createWidget({
        resource: 'swap',
        mode,
        size: 'big',
        theme,
        locale,
        affiliateCode,
      }),
    [theme, locale, affiliateCode],
  );

  const banner = useMemo(
    () =>
      createWidget({
        resource: 'swap',
        mode,
        size: 'banner',
        theme,
        locale,
        affiliateCode,
      }),
    [theme, locale, affiliateCode],
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
