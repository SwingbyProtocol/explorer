import Head from 'next/head';

import { ExplorerMain } from '../Common';

export { Browser } from './Explorer';
export { BrowserDetail } from './Swap';
export { BrowserPool } from './Pool';
export { BrowserMetanodes } from './NewMetanodes';
export { BrowserFees } from './Fees/';
export { BrowserAsset } from './Asset';
export { MetanodeEarners } from './MetanodeEarners';

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
