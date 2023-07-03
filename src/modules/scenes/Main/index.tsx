import Head from 'next/head';

import { ExplorerMain } from '../Common';

export { Browser } from './Explorer';
export { BrowserDetail } from './Swap';
export { BrowserPool } from './Pool';
export { BrowserLiquidity } from './Liquidity';
export { BrowserMetanodes } from './Metanodes';
export { BrowserFees } from './Fees/';
export { BrowserAsset } from './Asset';
export { BrowserSwapRewards } from './SwapRewards';
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
