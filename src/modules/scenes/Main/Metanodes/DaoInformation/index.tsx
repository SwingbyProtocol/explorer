import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { DaoInformationContainer, DaoLink } from './styled';

export const DaoInformation = () => {
  return (
    <DaoInformationContainer>
      <Text>
        <FormattedMessage id="metanodes.bond-erc20" />
      </Text>
      <ul>
        <li>
          <DaoLink
            href="https://swingby.substack.com/p/go-far-go-together-with-swingby-dao"
            className="dao-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="common.announcement" />
          </DaoLink>
        </li>
        <li>
          <DaoLink
            href="https://skybridge-docs.swingby.network/swingby-dao/tutorials/bridge-swingby-to-erc-20"
            className="dao-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="metanodes.how-to-bridge" />
          </DaoLink>
        </li>
      </ul>
    </DaoInformationContainer>
  );
};
