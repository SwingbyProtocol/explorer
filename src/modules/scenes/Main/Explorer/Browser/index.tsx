import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { useTheme } from 'styled-components';

import { useGetNetworkData } from '../../../../hooks';
import { FloatVolume } from '../FloatVolume';
import { StatsInfo } from '../StatsInfo';
import { TxHistories } from '../TxHistories';

import {
  Bottom,
  BrowserContainer,
  BrowserDiv,
  Top,
  IconInfo,
  RowLoader,
  RowTitleText,
  TitleText,
} from './styled';

export const Browser = () => {
  useGetNetworkData();
  const { locale } = useIntl();
  const theme = useTheme();

  const networkBridges = (
    <RowTitleText>
      <TitleText variant="section-title">
        <FormattedMessage id="home.network.network-bridges" />
      </TitleText>
    </RowTitleText>
  );

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        {networkBridges}
        <Top>
          <FloatVolume />
          <StatsInfo />
        </Top>
        <Bottom>
          <TxHistories />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
