import Head from 'next/head';

import { ExplorerMain } from '../../../components/Explorer';

export const Main = () => {
  return (
    <>
      <Head>
        <title>Swingby Explorer</title>
      </Head>
      {/* Todo: Add Swap later */}
      <div style={{ height: '70px' }}>
        <h1>Swap</h1>
      </div>
      <ExplorerMain />
    </>
  );
};
