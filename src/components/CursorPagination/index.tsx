import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

import { BackButton, NextButton, PaginationContainer, PaginationRow } from './styled';

interface Props {
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const CursorPagination = ({
  goToNextPage,
  goToPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  return (
    <PaginationRow>
      <PaginationContainer>
        <BackButton
          variant="secondary"
          size="state"
          shape="fit"
          onClick={hasPreviousPage && goToPreviousPage}
          disabled={!hasPreviousPage}
        >
          <Icon.CaretLeft />
        </BackButton>
        <NextButton
          variant="secondary"
          size="state"
          shape="fit"
          onClick={hasNextPage && goToNextPage}
          disabled={!hasNextPage}
        >
          <Icon.CaretRight />
        </NextButton>
      </PaginationContainer>
    </PaginationRow>
  );
};
