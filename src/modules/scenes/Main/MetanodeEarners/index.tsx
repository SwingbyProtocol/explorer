import { getFiatAssetFormatter } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { fetchNodeEarningsList, INodeEarningsResponse } from '../../../metanodes';
import { TextPrimary } from '../../Common';

import {
  Container,
  MetanodeEarnersContainer,
  RankFirst,
  RankSecond,
  RankThird,
  RankCircle,
  Row,
  RowUser,
  RowLeft,
  RowRight,
  Rank,
  Avatar,
  ColumnInfo,
  TextValue,
} from './styled';

export const MetanodeEarners = () => {
  const [metanodes, setMetanodes] = useState(null);
  const { locale } = useIntl();

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeEarningsList();
      setMetanodes(nodes);
    })();
  }, []);
  console.log('metanodes', metanodes);

  const rankCircle = (rank: number): JSX.Element => {
    switch (rank) {
      case 1:
        return <RankFirst>{rank}</RankFirst>;
      case 2:
        return <RankSecond>{rank}</RankSecond>;
      case 3:
        return <RankThird>{rank}</RankThird>;

      default:
        return <RankCircle>{rank}</RankCircle>;
    }
  };
  const formatConfig = {
    locale,
    currency: 'USD',
    maximumSignificantDigits: 4,
    notation: 'compact',
  } as const;
  return (
    <Container>
      <MetanodeEarnersContainer>
        {metanodes?.map((it: INodeEarningsResponse, index: number) => {
          return (
            <Row key={it.moniker}>
              <RowUser isLastItem={index === metanodes?.length - 1}>
                <RowLeft>
                  <Rank>
                    {rankCircle(index + 1)}
                    <Avatar />
                  </Rank>
                </RowLeft>
                <RowRight>
                  <ColumnInfo>
                    <TextValue variant="accent">{it.moniker}</TextValue>

                    <div>
                      <TextValue variant="masked">
                        <FormattedMessage
                          id="metanode-earners.bond"
                          values={{
                            value: <FormattedNumber value={it.bond} />,
                          }}
                        />
                      </TextValue>
                    </div>

                    <TextPrimary>
                      <FormattedMessage
                        id="metanode-earners.earn-month"
                        values={{
                          value: getFiatAssetFormatter(formatConfig).format(Number(it.earnings1M)),
                        }}
                      />
                    </TextPrimary>
                  </ColumnInfo>
                </RowRight>
              </RowUser>
            </Row>
          );
        })}
      </MetanodeEarnersContainer>
    </Container>
  );
};
