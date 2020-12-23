import React from 'react';
import { ScaleLoader } from 'react-spinners';

import { LoadContainer } from './styled';

interface Props {
  minHeight: number;
  marginTop?: number;
  testId?: string;
}

export const Loader = (props: Props) => {
  return (
    <LoadContainer
      minHeight={props.minHeight}
      marginTop={props.marginTop}
      data-testid={props.testId}
    >
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );
};
