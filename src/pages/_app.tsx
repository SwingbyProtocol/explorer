import { PulsarGlobalStyles, PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.min.css'; // eslint-disable-line
import { Layout } from '../components/Layout';
import { LOCAL_STORAGE } from '../modules/env';
import { languages } from '../modules/i18n';
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
    setThemeMode(storedTheme);
  }, [storedTheme]);

  return (
    <PulsarThemeProvider theme={themeMode}>
      <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
        <PulsarGlobalStyles />
        <ReduxProvider store={store}>
          <Layout setThemeMode={setThemeMode} themeMode={themeMode}>
            <Component {...pageProps} />
          </Layout>
        </ReduxProvider>
      </IntlProvider>
    </PulsarThemeProvider>
  );
}

export default MyApp;
