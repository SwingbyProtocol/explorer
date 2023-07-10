import styled from 'styled-components';
import { rem } from 'polished';
import { Button } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const ConnectWalletContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonConnect = styled(Button)`
  width: ${rem(176)};
  z-index: 10;
`;

export const BackDrop = styled.div`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    width: 100%;
    height: 100%;
    z-index: 10;
    /* Ref: As per request from Senga, make background more transparent than default to check the APR value without connecting wallet */
    background-color: ${({ theme }) =>
      theme.pulsar.id === 'PulsarLight' ? 'rgba(255,255,255,0.75)' : 'rgba(15,22,34,0.85)'};
  }
`;
