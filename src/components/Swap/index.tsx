import { Button } from '@swingby-protocol/pulsar';
import { createWidget, getHtml, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useAffiliateCode } from '../../modules/affiliate-code';
import { mode } from '../../modules/env';
import { useThemeSettings } from '../../modules/store/settings';
import { getTransactionFees } from '../../modules/explorer';
import { fetchTransactionFees } from '../../modules/store';
import { useSdkContext } from '../../modules/sdk-context';

import { StyledSwap, SwapMobileRow } from './styled';

export const Swap = () => {
  const dispatch = useDispatch();
  const context = useSdkContext();

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

  useEffect(() => {
    (async () => {
      const transactionFees = await getTransactionFees({ context });
      dispatch(fetchTransactionFees(transactionFees));
    })();
  }, [dispatch, context]);

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
