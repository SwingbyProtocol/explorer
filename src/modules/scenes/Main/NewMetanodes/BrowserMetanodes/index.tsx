import { SkybridgeBridge, SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PATH } from '../../../../env';
import { BridgeMetanodes } from '../BridgeMetanodes';
import { BridgeMobileMetanodes } from '../BridgeMobileMetanodes';
import { MetanodeInfo } from '../MeatanodeInfo';

import { BrowserMetanodesContainer, BrowserMetanodesDiv, Left, Right } from './styled';

export const BrowserMetanodes = () => {
  const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');

  const router = useRouter();
  const params = router.query;

  const setBridge = (bridge: SkybridgeBridge): void => {
    router.push({
      pathname: PATH.METANODES,
      query: { bridge },
    });
  };

  const bridge: SkybridgeBridge = params.bridge as SkybridgeBridge;

  useEffect(() => {
    if (params.bridge === '' || !SKYBRIDGE_BRIDGES.includes(params.bridge as SkybridgeBridge)) {
      router.push({
        pathname: PATH.METANODES,
        query: { bridge: btcErc },
      });
    }
  }, [bridge, btcErc, router, params.bridge]);

  return (
    <>
      <Head>
        <title>Swingby Explorer | Metanodes</title>
      </Head>
      <BrowserMetanodesContainer>
        <BrowserMetanodesDiv size="bare">
          <Left>
            <BridgeMobileMetanodes bridge={bridge} setBridge={setBridge} />
            <BridgeMetanodes bridge={bridge} setBridge={setBridge} />
          </Left>
          <Right>
            <MetanodeInfo bridge={bridge as SkybridgeBridge} />
          </Right>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
