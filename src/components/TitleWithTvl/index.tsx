import { getFiatAssetFormatter } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { PATH } from '../../modules/env';
import { useGetAllBridgesTvl } from '../../modules/hooks';

import { RowTvl, TextTvl, TitleWithTvlContainer, RowLoader } from './styled';

export const TitleWithTvl = () => {
  const theme = useTheme();
  const { tvl, isLoading } = useGetAllBridgesTvl(PATH.ROOT);
  const { locale } = useIntl();
  const tvlUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.allBridges);

  const placeholderLoader = (
    <RowLoader>
      <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
    </RowLoader>
  );

  return (
    <TitleWithTvlContainer>
      <FormattedMessage id="home.explorer" />
      <RowTvl>
        <TextTvl variant="section-title">
          <FormattedMessage id="common.tvl" /> {isLoading ? placeholderLoader : tvlUsd}
        </TextTvl>
      </RowTvl>
    </TitleWithTvlContainer>
  );
};
