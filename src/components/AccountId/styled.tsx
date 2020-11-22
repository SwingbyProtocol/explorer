import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

// Memo: Adjust to same margin/padding size which Pulsar provides to TextInput component
export const AccountIdWrapper = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 1rem;
  @media (min-width: ${rem(media.sm)}) {
    width: auto;
    padding: 0;
  }
`;

export const AccountIdContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => rem(theme.pulsar.size.country)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-radius: 0.25em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(250)};
    height: ${({ theme }) => rem(theme.pulsar.size.state)};
    margin-top: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(300)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    height: ${({ theme }) => rem(theme.pulsar.size.country)};
    width: ${rem(350)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(400)};
  }
`;

export const IconAvatar = styled(Icon.Swingby)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const IconClose = styled(Icon.NetworkValidators)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;
