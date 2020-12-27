import Head from 'next/head';

import { ExplorerMain } from '../Common';

export { Browser } from './Explorer';
export { BrowserDetail } from './Swap';
export { BrowserPool } from './Pool';
export { BrowserMetanodes } from './Metanodes';
export { BrowserFees } from './Fees/';

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
