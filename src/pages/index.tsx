import Head from 'next/head';
import React from 'react';

import { DocumentTitle } from '../types';
import ExplorerMain from '../components/Explorer/ExplorerMain';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{DocumentTitle.Explorer}</title>
      </Head>
      <div style={{ height: '7rem' }}>
        <h1>Swap</h1>
      </div>
      <ExplorerMain />
    </>
  );
};

export default Home;
