import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { LoaderComingSoonContainer, TextComingSoon, Row, LoaderBox } from './styled';

export const LoaderComingSoon = () => {
  const theme = useTheme();
  return (
    <LoaderComingSoonContainer>
      <TextComingSoon variant="accent">{'</>'}</TextComingSoon>
      <Row>
        <TextComingSoon variant="accent">COMING SOON </TextComingSoon>
        <LoaderBox>
          <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
        </LoaderBox>
      </Row>
    </LoaderComingSoonContainer>
  );
};
