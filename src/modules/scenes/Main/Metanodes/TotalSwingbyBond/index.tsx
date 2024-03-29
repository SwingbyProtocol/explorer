import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GenerateChart } from '../../../../../components/GenerateChart';
import { Loader } from '../../../../../components/Loader';
import { IChartDate } from '../../../../explorer';

import { Box, TitleDiv, TotalSwingbyBondContainer } from './styled';

interface Props {
  bondHistories: IChartDate[] | null;
  isLoading: boolean;
}

export const TotalSwingbyBond = (props: Props) => {
  const { bondHistories, isLoading } = props;
  const chart = !isLoading && bondHistories && bondHistories;
  const loader = <Loader marginTop={0} minHeight={130} />;

  return (
    <div>
      <TotalSwingbyBondContainer>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="metanodes.total-swingby-bond" />
          </Text>
        </TitleDiv>
        <Box>
          <GenerateChart
            chart={chart}
            isLoading={!isLoading && bondHistories && chart ? false : true}
            minHeight={130}
            loader={loader}
            isAxis={true}
          />
        </Box>
      </TotalSwingbyBondContainer>
    </div>
  );
};
