import { rem } from 'polished';
import styled from 'styled-components';

export const DaoInformationContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${rem(16)};
  padding-bottom: ${rem(4)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-radius: ${rem(8)};
`;

export const DaoLink = styled.a`
  cursor: pointer;
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  color: #3799da;
  font-weight: bold;
  text-decoration: none;
`;
