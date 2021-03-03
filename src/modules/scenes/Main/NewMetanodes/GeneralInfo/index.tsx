import { Text } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { CONTRACT_SB_BTC, CONTRACT_SWAP, URL_ETHERSCAN } from '../../../../env';
import { Atag, TextRoom } from '../../../Common';

import { GeneralInfoContainer, Left, Right, Row, RowTitle, AddressP } from './styled';

export const GeneralInfo = () => {
  const bridgeContract = CONTRACT_SWAP;
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
