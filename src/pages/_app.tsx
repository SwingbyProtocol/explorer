import { PulsarGlobalStyles, PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

import Layout from '../components/Layout';
import { en } from '../modules/i18n';
import '../index.scss';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const defaultLocale = router.defaultLocale ?? 'en-US';
  const locale = router.locale ?? defaultLocale;

  return (
    <PulsarThemeProvider>
      <IntlProvider messages={en} locale={locale} defaultLocale={defaultLocale}>
        <PulsarGlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </PulsarThemeProvider>
  );
}

export default MyApp;
