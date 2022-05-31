import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'; // eslint-disable-line import/no-internal-modules
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { createToast } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import styled from 'styled-components';
import { AppProps } from 'next/app';
import { NextPage } from 'next';

import { Globals } from '../components/Globals';
import { graphEndpoint } from '../modules/env';
import { languages } from '../modules/i18n';
import { SEO } from '../modules/seo';
import { useStore } from '../modules/store';
import LayoutView from '../layout';
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

type AppWithLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};
export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({ Component, pageProps }: AppWithLayoutProps) {
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

  const getLayout = Component.getLayout || ((page) => <LayoutView>{page}</LayoutView>);

  return (
    <ApolloProvider client={apolloClient}>
      <RouterScrollProvider>
        <SEO />
        <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
          <ReduxProvider store={store}>
            <Globals>
              <OldExplorerWarning />
              {getLayout(<Component {...pageProps} />)}
            </Globals>
          </ReduxProvider>
        </IntlProvider>
      </RouterScrollProvider>
    </ApolloProvider>
  );
}

export default MyApp;
