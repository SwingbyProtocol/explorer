import { Tooltip, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { URL } from '../../../../links';

import {
  ActionButtonMetanodesContainer,
  RowText,
  TextAPR,
  TextTitle,
  TextSwapFee,
  InfoIcon,
  ButtonSetupNode,
  ButtonSetupNodeAnchor,
} from './styled';

export const ActionButtonMetanodes = () => {
  const apr = 10;
  return (
    <ActionButtonMetanodesContainer>
      <RowText>
        <div>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apr" />
          </TextTitle>
          <TextAPR variant="accent">
            <FormattedMessage id="common.percent" values={{ value: ' ' + apr }} />
          </TextAPR>
        </div>
        <div>
          <TextSwapFee>
            <FormattedMessage id="metanodes.swap-fee" />
          </TextSwapFee>
          <Tooltip
            content={
              <Tooltip.Content>
                <Text variant="normal">
                  <FormattedMessage id="metanodes.swap-fee.detail" />
                </Text>
              </Tooltip.Content>
            }
            targetHtmlTag="span"
          >
            <InfoIcon />
          </Tooltip>
        </div>

        <div style={{ flex: 1 }}></div>

        <ButtonSetupNodeAnchor href={URL.SetupNode} target="_blank">
          <ButtonSetupNode variant="primary" size="country">
            How to Setup Node
          </ButtonSetupNode>
        </ButtonSetupNodeAnchor>
      </RowText>
    </ActionButtonMetanodesContainer>
  );
};
