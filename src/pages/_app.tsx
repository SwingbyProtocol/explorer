import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { Globals } from '../components/Globals';
import { languages } from '../modules/i18n';
import { SEO } from '../modules/seo';
import { useStore } from '../modules/store';

import './style.css';

const DEFAULT_LOCALE = 'en';

const apolloClient = new ApolloClient({
  uri: 'https://graph.swingby.network/api/graphql',
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
}

export default MyApp;
