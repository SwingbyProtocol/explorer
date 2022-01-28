import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetEarningHistorical } from '../../../../hooks';

import { EarningsChart } from './EarningsChart';
import { Box, Column, EarningStatsContainer, TextDate, TitleDiv } from './styled';
import { SummaryContent } from './SummaryContent';

type TContent = 'summary' | 'earning';

export const EarningStats = () => {
  const [active, setActive] = useState<TContent>('summary');
  const { farming, bridge } = useGetEarningHistorical();

  const switchContent = (active: TContent) => {
    switch (active) {
      case 'summary':
        return <SummaryContent farming={farming} bridge={bridge} />;
      case 'earning':
        return <EarningsChart farming={farming} bridge={bridge} />;

      default:
        return <SummaryContent farming={farming} bridge={bridge} />;
    }
  };

  useEffect(() => {
    setActive('summary');
  }, [bridge]);

  return (
    <EarningStatsContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="pool.earnings" />
          </Text>
          <Column>
            <TextDate
              variant="label"
              onClick={() => setActive('earning')}
              isActive={'earning' === active}
            >
              <FormattedMessage id="pool.earning" />
            </TextDate>
            <TextDate
              variant="label"
              onClick={() => setActive('summary')}
              isActive={'summary' === active}
            >
              <FormattedMessage id="pool.summary" />
            </TextDate>
          </Column>
        </TitleDiv>
        <>{switchContent(active)}</>
      </Box>
    </EarningStatsContainer>
  );
};
