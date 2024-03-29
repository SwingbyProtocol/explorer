import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { AddressLinkP } from '../../../Common';

const { media } = StylingConstants;

export const GeneralInfoContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: 100%;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Row = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.md)}) {
    display: grid;
    grid-template-columns: ${rem(140)} auto;
  }
`;
export const Left = styled.div``;

export const Right = styled.div``;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
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
