import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { LoaderComingSoonContainer, TextComingSoon, Row, LoaderBox } from './styled';

interface Props {
  isPlaceholder?: boolean;
}

export const LoaderComingSoon = (props: Props) => {
  const theme = useTheme();
  return (
    <LoaderComingSoonContainer>
      <TextComingSoon variant="accent">{'</>'}</TextComingSoon>
      <Row>
        <TextComingSoon variant="accent">
          {props.isPlaceholder ? 'COMING SOON...' : 'LOADING'}{' '}
        </TextComingSoon>
        {!props.isPlaceholder && (
          <LoaderBox>
            <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
          </LoaderBox>
        )}
      </Row>
    </LoaderComingSoonContainer>
  );
};
