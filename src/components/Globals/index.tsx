import {
  PulsarGlobalStyles,
  PulsarThemeProvider,
  PulsarToastContainer,
  PULSAR_GLOBAL_FONT_HREF,
} from '@swingby-protocol/pulsar';
import Head from 'next/head';
import React from 'react';

import { useThemeSettings } from '../../modules/store/settings';
import { Favicon } from '../Favicon';

export const Globals = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useThemeSettings();
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
