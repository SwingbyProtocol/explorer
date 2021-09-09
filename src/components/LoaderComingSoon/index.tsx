import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { LoaderComingSoonContainer, TextComingSoon, Row, LoaderBox } from './styled';

interface Props {
  isPlaceholder?: boolean;
  isSmallWindow?: boolean;
}

export const LoaderComingSoon = (props: Props) => {
  const theme = useTheme();
  const textVariant = props.isSmallWindow ? 'label' : 'accent';
  return (
    <LoaderComingSoonContainer>
      <TextComingSoon variant={textVariant}>{'</>'}</TextComingSoon>
      <Row>
        <TextComingSoon variant={textVariant}>
          {props.isPlaceholder ? (
            <FormattedMessage id="common.coming-soon" />
          ) : (
            <FormattedMessage id="common.loader.loading" />
          )}
        </TextComingSoon>
        {!props.isPlaceholder && !props.isSmallWindow && (
          <LoaderBox>
            <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
          </LoaderBox>
        )}
      </Row>
    </LoaderComingSoonContainer>
  );
};
