import { Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import { FormattedMessage } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { PATH } from '../../../../env';
import { useRunCountDown, useToggleBridge } from '../../../../hooks';
import { IChurn } from '../../../../metanodes';
import { getScanDetailBaseEndpoint } from '../../../../pool';
import { Atag, TextRoom } from '../../../Common';

import { AddressP, ChurningContainer, Left, Right, Row, RowTitle } from './styled';

interface Props {
  churnTime: IChurn | null;
  isLoading: boolean;
}

export const Churning = (props: Props) => {
  const { churnTime, isLoading } = props;
  const dt = churnTime && DateTime.fromISO(churnTime.nextAt);
  const nextTimestamp = churnTime && Number(dt.toSeconds().toFixed(0));
  const cd = useRunCountDown(nextTimestamp);

  const { bridge } = useToggleBridge(PATH.METANODES);
  const baseUrl = getScanDetailBaseEndpoint(bridge);

  const nextTime = cd?.days >= 0 && (
    <FormattedMessage
      id="metanodes.churned-next-time"
      values={{
        days: cd.days,
        hours: cd.hours,
        minutes: cd.minutes,
      }}
    />
  );

  const lastAddress = churnTime && churnTime.lastTxHash;
  const lastAddressUrl = `${baseUrl}/tx/${lastAddress}`;

  const loader = <Loader marginTop={0} minHeight={0} />;
  return (
    <ChurningContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.churning" />
        </Text>
      </RowTitle>
      {!isLoading ? (
        <>
          <Row>
            <Left>
              <TextRoom variant="label">
                <FormattedMessage id="metanodes.next" />
              </TextRoom>
            </Left>
            <Right>
              <TextRoom variant="label">{nextTime}</TextRoom>
            </Right>
          </Row>
          <Row>
            <Left>
              <TextRoom variant="label">
                <FormattedMessage id="metanodes.last" />
              </TextRoom>
            </Left>
            <Right>
              <Atag href={lastAddressUrl} rel="noopener noreferrer" target="_blank">
                <AddressP>{lastAddress}</AddressP>
              </Atag>
            </Right>
          </Row>
        </>
      ) : (
        loader
      )}
    </ChurningContainer>
  );
};
