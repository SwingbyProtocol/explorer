import Head from 'next/head';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BridgeMetanodes } from '../BridgeMetanodes';
import { BridgeMobileMetanodes } from '../BridgeMobileMetanodes';
import { DaoInformation } from '../DaoInformation';
import { MetanodeInfo } from '../MeatanodeInfo';

import { BrowserMetanodesContainer, BrowserMetanodesDiv, Left, Right } from './styled';

export const BrowserMetanodes = () => {
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
          <Right>
            {bridge === 'btc_erc' && <DaoInformation />}
            <MetanodeInfo />
          </Right>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
