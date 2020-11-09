import styled from 'styled-components';
import { rem } from 'polished';

export const StyledSwap = styled.iframe`
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
`;
