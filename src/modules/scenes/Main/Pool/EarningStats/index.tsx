import { Text } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Box, Column, EarningStatsContainer, TextDate, TitleDiv } from './styled';
import { SummaryContent } from './SummaryContent';

type TContent = 'summary' | 'earning' | 'apr';

export const EarningStats = () => {
  const [active, setActive] = useState<TContent>('summary');

  const earningContent = (
    <div>
      <span>Earning</span>
    </div>
  );

  const aprContent = (
    <div>
      <span>Apr</span>
    </div>
  );

  const switchContent = (active: TContent) => {
    switch (active) {
      case 'summary':
        return <SummaryContent />;
      case 'earning':
        return earningContent;
      case 'apr':
        return aprContent;

      default:
        return <SummaryContent />;
    }
  };

  return (
    <EarningStatsContainer>
      <Box>
        <TitleDiv>
          <Text variant="section-title">
            <FormattedMessage id="pool.earnings" />
          </Text>
          <Column>
            <TextDate variant="label" onClick={() => setActive('apr')} isActive={'apr' === active}>
              <FormattedMessage id="pool.apr" />
            </TextDate>
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
