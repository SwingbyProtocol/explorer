import {
  PulsarGlobalStyles,
  PulsarThemeProvider,
  PulsarToastContainer,
  PULSAR_GLOBAL_FONT_HREF,
} from '@swingby-protocol/pulsar';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { useThemeSettings, useSystemTheme } from '../../modules/store/settings';
import { Favicon } from '../Favicon';

export const Globals = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useThemeSettings();
  const systemTheme = useSystemTheme();

  useEffect(() => {
    if (['light', 'dark'].includes(theme)) {
      document.body.setAttribute('data-theme', theme);
    } else if (['auto'].includes(theme)) {
      document.body.setAttribute('data-theme', systemTheme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme, systemTheme]);

  return (
    <PulsarThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>
      <PulsarGlobalStyles />
      <Favicon />
      {children}
      <PulsarToastContainer />
    </PulsarThemeProvider>
  );
};
