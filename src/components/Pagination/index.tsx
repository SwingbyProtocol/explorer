import { Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BackButton, NextButton, PageRow, PaginationContainer, PaginationRow } from './styled';

interface Props {
  page: number;
  maximumPage: number;
  goBackPage: () => void;
  goNextPage: () => void;
}

export const Pagination = (props: Props) => {
  const { page, maximumPage, goBackPage, goNextPage } = props;
  return (
    <PaginationRow>
      <PaginationContainer>
        <BackButton
          variant="secondary"
          size="state"
          onClick={() => page > 1 && goBackPage()}
          disabled={1 >= page}
        >
          <Icon.CaretLeft />
        </BackButton>
        <PageRow page={page}>
          <Text variant="masked">
            <FormattedMessage
              id="common.page"
              values={{ currentPage: page, maximumPage: maximumPage }}
            />
          </Text>
        </PageRow>
        <NextButton
          variant="secondary"
          size="state"
          onClick={() => maximumPage > page && goNextPage()}
          disabled={page >= maximumPage}
        >
          <Icon.CaretRight />
        </NextButton>
      </PaginationContainer>
    </PaginationRow>
  );
};
