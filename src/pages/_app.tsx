import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'; // eslint-disable-line import/no-internal-modules
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { createToast } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import styled from 'styled-components';

import { Globals } from '../components/Globals';
import { graphEndpoint } from '../modules/env';
import { languages } from '../modules/i18n';
import { SEO } from '../modules/seo';
import { useStore } from '../modules/store';
import './style.css';

const DEFAULT_LOCALE = 'en';

const apolloClient = new ApolloClient({
  uri: graphEndpoint,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transactions: relayStylePagination(['where']),
        },
      },
    },
  }),
});

const OldExplorerWarningText = styled.span`
  a {
    color: inherit;
  }
`;

const OldExplorerWarning = () => {
  useEffect(() => {
    createToast({
      type: 'info',
      content: (
        <OldExplorerWarningText>
          <FormattedMessage
            id="toast.old-explorer"
            values={{
              link: (
                <a href="https://old.skybridge.info" rel="noopener noreferrer">
                  https://old.skybridge.info
                </a>
              ),
            }}
          />
        </OldExplorerWarningText>
      ),
      autoClose: false,
      toastId: 'oldExplorer',
    });
  }, []);
  return <>{null}</>;
};

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
              <OldExplorerWarning />
              <Component {...pageProps} />
            </Globals>
          </ReduxProvider>
        </IntlProvider>
      </RouterScrollProvider>
    </ApolloProvider>
  );
}

export default MyApp;
