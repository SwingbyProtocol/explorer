import { Text } from '@swingby-protocol/pulsar';
import { CONTRACTS, SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { FormattedMessage } from 'react-intl';

import { mode, PATH } from '../../../../env';
import { getScanDetailBaseEndpoint } from '../../../../etherscan';
import { useToggleBridge } from '../../../../hooks';
import { getSbBtcContract } from '../../../../pool';
import { Atag, TextRoom } from '../../../Common';

import { AddressP, GeneralInfoContainer, Left, Right, Row, RowTitle } from './styled';

export const GeneralInfo = () => {
  const { bridge } = useToggleBridge(PATH.METANODES);

  const baseUrl = getScanDetailBaseEndpoint(bridge);
  const bridgeContract =
    SKYBRIDGE_BRIDGES.includes(bridge) && CONTRACTS.bridges[bridge][mode].address;
  const contractUrl = `${baseUrl}/address/${bridgeContract}`;

  const lpContract = getSbBtcContract(bridge);
  const lpContractUrl = `${baseUrl}/address/${lpContract}`;
  return (
    <GeneralInfoContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="metanodes.general-info" />
        </Text>
      </RowTitle>
      <Row>
        <Left>
          <TextRoom variant="label">
            <FormattedMessage id="metanodes.bridge-contract" />
          </TextRoom>
        </Left>
        <Right>
          <Atag href={contractUrl} rel="noopener noreferrer" target="_blank">
            <AddressP>{bridgeContract}</AddressP>
          </Atag>
        </Right>
      </Row>
      <Row>
        <Left>
          <TextRoom variant="label">
            <FormattedMessage id="metanodes.lp-contract" />
          </TextRoom>
        </Left>
        <Right>
          <Atag href={lpContractUrl} rel="noopener noreferrer" target="_blank">
            <AddressP>{lpContract}</AddressP>
          </Atag>
        </Right>
      </Row>
    </GeneralInfoContainer>
  );
};
