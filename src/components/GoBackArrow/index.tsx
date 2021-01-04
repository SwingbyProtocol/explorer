import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { PATH } from '../../modules/env';
import { IconBack } from '../../modules/scenes/Common';

export const GoBackArrow = () => {
  const router = useRouter();
  const explorer = useSelector((state) => state.explorer);
  const { isExistPreviousPage } = explorer;
  const scrollToBack = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
    router.back();
  };
  return (
    <IconBack
      onClick={() => {
        isExistPreviousPage ? scrollToBack() : router.push(PATH.ROOT);
      }}
    />
  );
};
