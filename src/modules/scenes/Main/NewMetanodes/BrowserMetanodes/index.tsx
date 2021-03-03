import Head from 'next/head';
import { useState } from 'react';

import { MetanodeBridges } from '../../../../metanodes';
import { BridgeMetanodes } from '../BridgeMetanodes';
import { BridgeMobileMetanodes } from '../BridgeMobileMetanodes';
import { MetanodeInfo } from '../MeatanodeInfo';

import { BrowserMetanodesContainer, BrowserMetanodesDiv, Left, Right } from './styled';

export const BrowserMetanodes = () => {
  const [bridge, setBridge] = useState(MetanodeBridges[0]);

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
            <MetanodeInfo bridge={bridge} />
          </Right>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
