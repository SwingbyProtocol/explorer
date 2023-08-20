import Head from 'next/head';

import { ExplorerMain } from '../Common';

export { Browser } from './Explorer';
export { BrowserDetail } from './SwapLegacy';
export { BrowserPool } from './Pool';
export { BrowserLiquidity } from './Liquidity';
export { BrowserSwap } from './Swap';
export { BrowserMetanodes } from './Metanodes';
export { BrowserFees } from './Fees/';
export { BrowserAsset } from './Asset';
export { BrowserSwapRewards } from './SwapRewards';
export { MetanodeEarners } from './MetanodeEarners';
export { Migrate } from './Migrate';

export const Main = () => {
  return (
    <>
      <Head>
        <title>Swingby Skybridge</title>
      </Head>
      <ExplorerMain />
    </>
  );
};
