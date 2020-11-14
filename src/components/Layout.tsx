import Head from 'next/head';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { debounce } from '../modules/env';
import { setWidthSize } from '../modules/store';

import { Header } from './Header';

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth);

  const debouncedHandleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    dispatch(setWidthSize(width));
    window.addEventListener('resize', debouncedHandleResize);
  }, [width, dispatch, debouncedHandleResize]);

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
