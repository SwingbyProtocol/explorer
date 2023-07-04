import { useMemo } from 'react';
import { Dropdown, Icon } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';
import Head from 'next/head';
import { createWidget, getHtml } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAffiliateCode } from '../../../../affiliate-code';
import { mode, PATH } from '../../../../env';
import { useThemeSettings } from '../../../../store/settings';

import {
  BrowserSwapContainer,
  BrowserSwapDiv,
  NetworkDropdownContainer,
  SwapBridgeDropdownTarget,
  SwapContainer,
  SwapExtendedFooter,
  ExplorerLinkContainer,
  ExplorerIconContainer,
} from './styled';

export const BrowserSwap = () => {
  const { locale } = useRouter();
  const affiliateCode = useAffiliateCode();
  const [theme] = useThemeSettings();

  const swapForm = useMemo(
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

  return (
    <>
      <Head>
        <title>Swingby Explorer | Swap</title>
      </Head>
      <NetworkDropdownContainer>
        <FormattedMessage id="swap.mode.network-select-label" />
        <Dropdown
          target={
            <SwapBridgeDropdownTarget size="city">
              <FormattedMessage id="swap.mode.ethereum" />
            </SwapBridgeDropdownTarget>
          }
        >
          <Dropdown.Item selected>
            <FormattedMessage id="swap.mode.ethereum" />
          </Dropdown.Item>
        </Dropdown>
      </NetworkDropdownContainer>
      <BrowserSwapContainer>
        <BrowserSwapDiv size="bare">
          <SwapContainer dangerouslySetInnerHTML={{ __html: getHtml({ widget: swapForm }) }} />
          <SwapExtendedFooter>
            <Link href={PATH.EXPLORER}>
              <ExplorerLinkContainer>
                <FormattedMessage id="swap.go-to-explorer" />
                <ExplorerIconContainer>
                  <Icon.CaretRight />
                </ExplorerIconContainer>
              </ExplorerLinkContainer>
            </Link>
          </SwapExtendedFooter>
        </BrowserSwapDiv>
      </BrowserSwapContainer>
    </>
  );
};
