import { Text } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { CONTRACT_SB_BTC, URL_ETHERSCAN } from '../../../../env';
import { Atag, TextRoom } from '../../../Common';

import { AddressP, ChurningContainer, Left, Right, Row, RowTitle } from './styled';

export const Churning = () => {
  const nextTime = '2d 3hr 20m';

  const lastAddress = CONTRACT_SB_BTC;
  const lastAddressUrl = `${URL_ETHERSCAN}/address/${lastAddress}`;
  return (
    <ChurningContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.churning" />
        </Text>
      </RowTitle>
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
    </ChurningContainer>
  );
};
