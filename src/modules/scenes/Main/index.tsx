import Head from 'next/head';

import { ExplorerMain } from '../../../components/Explorer';
import { DocumentTitle } from '../../constants';

export const Main = () => {
  return (
    <>
      <Head>
        <title>{DocumentTitle.Explorer}</title>
      </Head>
      {/* Todo: Add Swap later */}
      <div style={{ height: '70px' }}>
        <h1>Swap</h1>
      </div>
      <ExplorerMain />
    </>
  );
};
