import { rem } from 'polished';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  word-break: break-all;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;
