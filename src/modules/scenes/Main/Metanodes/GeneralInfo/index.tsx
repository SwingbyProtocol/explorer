import { Text } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import { FormattedMessage } from 'react-intl';

import { CONTRACT_SB_BTC, mode, PATH, URL_ETHERSCAN } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { Atag, TextRoom } from '../../../Common';

import { GeneralInfoContainer, Left, Right, Row, RowTitle, AddressP } from './styled';

export const GeneralInfo = () => {
  const { bridge } = useToggleBridge(PATH.METANODES);

  const bridgeContract = bridge && CONTRACTS.bridges[bridge][mode].address;
  const contractUrl = `${URL_ETHERSCAN}/address/${bridgeContract}`;

  const lpContract = CONTRACT_SB_BTC;
  const lpContractUrl = `${URL_ETHERSCAN}/address/${lpContract}`;
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
