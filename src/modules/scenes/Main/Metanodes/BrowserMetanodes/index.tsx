import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import Head from 'next/head';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BridgeMetanodes } from '../BridgeMetanodes';
import { BridgeMobileMetanodes } from '../BridgeMobileMetanodes';
import { MetanodeInfo } from '../MeatanodeInfo';

import { BrowserMetanodesContainer, BrowserMetanodesDiv, Left, Right } from './styled';

export const BrowserMetanodes = () => {
  const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');

  const { bridge } = useToggleBridge(PATH.METANODES);

  return (
    <>
      <Head>
        <title>Swingby Explorer | Metanodes</title>
      </Head>
      <BrowserMetanodesContainer>
        <BrowserMetanodesDiv size="bare">
          <Left>
            <BridgeMobileMetanodes />
            <BridgeMetanodes />
          </Left>
          <Right>{bridge && bridge !== btcErc ? <h1>COMING SOON</h1> : <MetanodeInfo />}</Right>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
