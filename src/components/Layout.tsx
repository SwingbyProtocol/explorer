import Head from 'next/head';
import React, { ReactNode } from 'react';

import { GlobalStyle } from '../styles/globalStyle';

import Header from './Common/Header';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GlobalStyle />
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
