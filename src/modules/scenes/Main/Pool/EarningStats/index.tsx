import { Text } from '@swingby-protocol/pulsar';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetEarningHistorical } from '../../../../hooks';
import { useOnboard } from '../../../../onboard';

import { AprHistoricalChart } from './AprHistoricalChart';
import { EarningsChart } from './EarningsChart';
import { Box, Column, EarningStatsContainer, TextDate, TitleDiv } from './styled';
import { SummaryContent } from './SummaryContent';

type TContent = 'summary' | 'earning' | 'apr';

export const EarningStats = () => {
  const [active, setActive] = useState<TContent>('summary');
  const { farming, bridge, aprHistoric } = useGetEarningHistorical();
  const { network } = useOnboard();

  const switchContent = (active: TContent) => {
    switch (active) {
      case 'summary':
        return <SummaryContent farming={farming} bridge={bridge} />;
      case 'earning':
        return <EarningsChart farming={farming} bridge={bridge} />;
      case 'apr':
        return <AprHistoricalChart aprHistoric={aprHistoric} bridge={bridge} />;

      default:
        return <SummaryContent farming={farming} bridge={bridge} />;
    }
  };

  useEffect(() => {
    setActive('summary');
  }, [bridge]);

  const isMainnet = network === 1 || network === 56;

  return (
    <EarningStatsContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="pool.earnings" />
          </Text>
          <Column>
            {isMainnet && (
              <TextDate
                variant="label"
                onClick={() => setActive('apr')}
                isActive={'apr' === active}
              >
                <FormattedMessage id="pool.apr" />
              </TextDate>
            )}
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
