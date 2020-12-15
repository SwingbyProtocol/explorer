import Head from 'next/head';
import React from 'react';

import { BrowserMetanodesContainer, BrowserMetanodesDiv } from './styled';

export const BrowserMetanodes = () => {
  return (
    <>
      <Head>
        <title>Swingby Explorer | Metanodes</title>
      </Head>
      <BrowserMetanodesContainer>
        <BrowserMetanodesDiv size="bare">
          <h1>hello</h1>
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
