import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

export const SwapVolumeContainer = styled.div`
  min-width: ${rem(160)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TitleDiv = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const AllVolumeSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
  cursor: pointer;
`;
