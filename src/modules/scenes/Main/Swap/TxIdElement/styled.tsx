import { rem } from 'polished';
import styled from 'styled-components';

export const AddressP = styled.p`
  color: #3799da;
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;
