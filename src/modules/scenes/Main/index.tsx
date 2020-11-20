import Head from 'next/head';

import { ExplorerMain } from './Explorer';

export const Main = () => {
  return (
    <>
      <Head>
        <title>Swingby Explorer</title>
      </Head>
      <ExplorerMain />
    </>
  );
};
