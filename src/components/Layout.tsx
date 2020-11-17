import { useWindowWidth } from '@react-hook/window-size';
import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setWidthSize } from '../modules/store';

import { Header } from './Header';

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const width = useWindowWidth({
    wait: 500,
  });

  useEffect(() => {
    dispatch(setWidthSize(width));
  }, [width, dispatch]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      {props.children}
    </>
  );
};
