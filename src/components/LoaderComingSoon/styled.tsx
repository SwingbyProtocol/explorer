import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

// Memo: Required to parents => text-align: center; position: relative;
export const LoaderComingSoonContainer = styled.div`
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const TextComingSoon = styled(Text)`
  display: block;
  white-space: nowrap;
`;

export const Row = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

export const LoaderBox = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;
