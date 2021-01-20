import { RouterScrollProvider } from '@moxy/next-router-scroll';
import {
  PulsarGlobalStyles,
  PulsarThemeProvider,
  PULSAR_GLOBAL_FONT_HREF,
} from '@swingby-protocol/pulsar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';

import { Layout } from '../components/Layout';
import { LOCAL_STORAGE, PATH } from '../modules/env';
import { languages } from '../modules/i18n';
import { SEO } from '../modules/seo';
import { useStore } from '../modules/store';
import './style.css';

const DEFAULT_LOCALE = 'en';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore();

  const locale = useMemo(() => {
    if (Object.keys(languages).includes(router.locale)) {
      return router.locale;
    }

    return DEFAULT_LOCALE;
  }, [router.locale]);

  const messages = useMemo(() => ({ ...languages[DEFAULT_LOCALE], ...languages[locale] }), [
    locale,
  ]);

  const [themeMode, setThemeMode] = useState(null);
  const storedTheme =
    typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE.ThemeMode);

  useEffect(() => {
    if (router.pathname === PATH.METANODE_EARNERS) {
      setThemeMode('light');
    } else {
      setThemeMode(storedTheme);
    }
  }, [storedTheme, router.pathname]);

  return (
    <>
      <RouterScrollProvider>
        <SEO />
        <PulsarThemeProvider theme={themeMode}>
          <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
            <Head>
              <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
            </Head>
            <PulsarGlobalStyles />
            <ReduxProvider store={store}>
              <Layout setThemeMode={setThemeMode} themeMode={themeMode}>
                <Component {...pageProps} />
              </Layout>
            </ReduxProvider>
          </IntlProvider>
        </PulsarThemeProvider>
      </RouterScrollProvider>
    </>
  );
}

export default MyApp;
