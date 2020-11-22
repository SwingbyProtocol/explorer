import React from 'react';
import { ScaleLoader } from 'react-spinners';

import { LoadContainer } from './styled';

interface Props {
  minHeight: number;
  testId?: string;
}

export const Loader = (props: Props) => {
  return (
    <LoadContainer minHeight={props.minHeight} data-testid={props.testId}>
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );
};
