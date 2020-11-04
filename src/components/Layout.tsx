import Head from 'next/head';
import React, { ReactNode } from 'react';

import { Header } from './Header';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      {props.children}
    </>
  );
};

export default Layout;
