import Head from 'next/head';

import { Swap } from '../../../components/Swap';

import { ExplorerMain } from './Explorer';
import { SwapContainer } from './styled';

export const Main = () => {
  return (
    <>
      <Head>
        <title>Swingby Explorer</title>
      </Head>
      <SwapContainer>
        <Swap />
      </SwapContainer>
      <ExplorerMain />
    </>
  );
};
