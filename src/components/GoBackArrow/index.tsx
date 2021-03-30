import { useRouter } from 'next/router';
import React from 'react';

import { PATH } from '../../modules/env';
import { IconBack } from '../../modules/scenes/Common';

export const GoBackArrow = () => {
  const router = useRouter();

  return (
    <IconBack
      onClick={() => {
        router.push(PATH.ROOT);
      }}
    />
  );
};
