import Head from 'next/head';
import { rem } from 'polished';
import React, { useCallback, useEffect, useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import { GA_TAG } from '../../../modules/env';
import { URL } from '../../../modules/links';

const ANALYTICS_ID = GA_TAG;
const ANALYTICS_STORAGE_KEY = 'ANALYTICS_CONSENT';

export const CookieConsentHandler = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const [cookiePermission, setCookiePermission] = useState(false);
  const handleCookieAccept = useCallback(() => {
    setCookiePermission(true);
  }, []);

  useEffect(() => {
    const storedPermission = Cookies.get(ANALYTICS_STORAGE_KEY);
    setCookiePermission(storedPermission === 'true');
  }, [setCookiePermission]);

  return (
    <>
      <Head>
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
  );
};
