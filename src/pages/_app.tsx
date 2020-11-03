import { PulsarGlobalStyles, PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';

import { languages } from '../modules/i18n';
import { useStore } from '../modules/store';
import '../index.scss';
import Layout from '../components/Layout';

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

  return (
    <PulsarThemeProvider>
      <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
        <PulsarGlobalStyles />
        <ReduxProvider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ReduxProvider>
      </IntlProvider>
    </PulsarThemeProvider>
  );
}

export default MyApp;
