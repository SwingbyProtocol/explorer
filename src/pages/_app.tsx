import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';

import { Globals } from '../components/Globals';
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

  const messages = useMemo(
    () => ({ ...languages[DEFAULT_LOCALE], ...languages[locale] }),
    [locale],
  );

  return (
    <RouterScrollProvider>
      <SEO />
      <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
        <ReduxProvider store={store}>
          <Globals>
            <Component {...pageProps} />
          </Globals>
        </ReduxProvider>
      </IntlProvider>
    </RouterScrollProvider>
  );
}

export default MyApp;
