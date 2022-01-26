import { SwapStatusIcon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { AddressLinkP, TextRoom } from '../../../Common';

const { media } = StylingConstants;

export const NodeStatusContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Row = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  display: grid;
  grid-template-columns: ${rem(130)} auto;
`;

export const Left = styled.div``;

export const Right = styled.div``;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const AddressP = styled(AddressLinkP)`
  max-width: ${rem(280)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.sm)}) {
    margin-top: 0;
    max-width: ${rem(380)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    max-width: ${rem(200)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: 0;
    max-width: ${rem(112)};
  }
`;

export const StatusIcon = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ColumnStatus = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.closet)} auto;
  align-items: center;
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
`;

export const TextNodeQty = styled(TextRoom)`
  color: #3799da;
  font-weight: bold;
  cursor: pointer;
`;
