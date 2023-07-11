import Head from 'next/head';

import { BridgeMetanodes } from '../BridgeMetanodes';
import { BridgeMobileMetanodes } from '../BridgeMobileMetanodes';
import { MetanodeInfo } from '../MeatanodeInfo';

import { BrowserMetanodesContainer, BrowserMetanodesDiv, Left, Right } from './styled';

export const BrowserMetanodes = () => {
  return (
    <>
      <Head>
        <title>Swingby Skybridge | Metanodes</title>
      </Head>
      <BrowserMetanodesContainer>
        <BrowserMetanodesDiv size="bare">
          <Left>
            <BridgeMobileMetanodes />
            <BridgeMetanodes />
          </Left>
          <Right>
            <MetanodeInfo />
          </Right>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
