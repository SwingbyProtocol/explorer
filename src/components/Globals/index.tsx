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
        <link
          rel="icon"
          href={
            'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/high-voltage_26a1.png'
          }
        />
      </Head>
      <PulsarGlobalStyles />
      <Favicon />
      {children}
      <PulsarToastContainer />
    </PulsarThemeProvider>
  );
};
