import Head from 'next/head';
import React from 'react';
import ExplorerMain from 'src/components/Explorer/ExplorerMain';
import { DocumentTitle } from 'src/types';

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