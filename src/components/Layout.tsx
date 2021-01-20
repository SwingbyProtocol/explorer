import { useWindowWidth } from '@react-hook/window-size';
import { PULSAR_GLOBAL_FONT_HREF, PulsarToastContainer } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { GA_TAG, mode, PATH } from '../modules/env';
import { getTransactionFees, getUsdPrice, TTheme } from '../modules/explorer';
import { useInterval } from '../modules/hooks';
import { URL } from '../modules/links';
import { SdkContextProvider } from '../modules/sdk-context';
import { fetchTransactionFees, fetchUsdPrice, setWidthSize } from '../modules/store';

import { Header } from './Header';
import { SwapContainer } from './styled';
import { Swap } from './Swap';

interface Props {
  children: ReactNode;
  setThemeMode: (theme: string) => void;
  themeMode: TTheme;
}

export const Layout = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const width = useWindowWidth({
    wait: 500,
  });

  useEffect(() => {
    dispatch(setWidthSize(width));
  }, [width, dispatch]);

  useEffect(() => {
    (async () => {
      const transactionFees = await getTransactionFees();
      dispatch(fetchTransactionFees(transactionFees));
    })();
  }, [dispatch]);

  useInterval(() => {
    (async () => {
      const results = await Promise.all([getUsdPrice(), getTransactionFees()]);
      dispatch(fetchUsdPrice(results[0]));
      dispatch(fetchTransactionFees(results[1]));
    })();
  }, [60000]);

  const ANALYTICS_ID = GA_TAG;
  const ANALYTICS_STORAGE_KEY = 'ANALYTICS_CONSENT';
  const [cookiePermission, setCookiePermission] = useState(false);
  const handleCookieAccept = useCallback(() => {
    setCookiePermission(true);
  }, []);
  // Memo: every page load will trigger track event if cookie is set
  useEffect(() => {
    const storedPermission = Cookies.get(ANALYTICS_STORAGE_KEY);
    setCookiePermission(storedPermission === 'true');
  }, [setCookiePermission]);

  // Memo: Provide to other page by iframe
  const metanodesEarnersPage = (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
      </Head>
      {props.children}
    </>
  );

  return (
    <>
      {router.pathname === PATH.METANODE_EARNERS ? (
        metanodesEarnersPage
      ) : (
        <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
            <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
            {cookiePermission && (
              <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`} />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ANALYTICS_ID}');
                `,
                  }}
                />
              </>
            )}
          </Head>
          <SdkContextProvider mode={mode}>
            <PulsarToastContainer />

            <Header setThemeMode={props.setThemeMode} themeMode={props.themeMode} />
            <SwapContainer>
              <Swap />
            </SwapContainer>
            {props.children}
          </SdkContextProvider>

          {!cookiePermission && (
            <CookieConsent
              location="bottom"
              cookieName={ANALYTICS_STORAGE_KEY}
              buttonText={formatMessage({ id: 'common.cookies.continue' })}
              style={{
                background: theme.pulsar.color.bg.transparent,
                color: theme.pulsar.color.text.normal,
              }}
              buttonStyle={{
                color: theme.pulsar.color.text.normal,
                fontSize: rem(theme.pulsar.size.room),
                background: theme.pulsar.color.primary.normal,
                borderRadius: '0.75em',
                paddingLeft: rem(theme.pulsar.size.closet),
                paddingRight: rem(theme.pulsar.size.closet),
                paddingTop: rem(theme.pulsar.size.drawer),
                paddingBottom: rem(theme.pulsar.size.drawer),
              }}
              expires={150}
              onAccept={handleCookieAccept}
              debug={true}
            >
              <FormattedMessage id="common.cookies" />
              <a
                href={URL.PrivacyPolicy}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  color: theme.pulsar.color.text.normal,
                }}
              >
                <FormattedMessage id="footer.privacy-policy" />
              </a>
              .
            </CookieConsent>
          )}
        </>
      )}
    </>
  );
};
