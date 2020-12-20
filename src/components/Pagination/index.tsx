import { Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BackButton, NextButton, PageRow, PaginationContainer, PaginationRow } from './styled';

interface Props {
  page: number;
  maximumPage: number;
  goBackPage: () => void;
  goNextPage: () => void;
}

export const Pagination = (props: Props) => {
  const { page, maximumPage, goBackPage, goNextPage } = props;
  const { locale } = useIntl();
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
            {locale === 'en' ? (
              <>
                <FormattedMessage id="common.page.pre" />
                <FormattedMessage id="common.page" />
                {page}
              </>
            ) : (
              <>
                <FormattedMessage id="common.page.pre" />
                {page}
                <FormattedMessage id="common.page" />
              </>
            )}
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
