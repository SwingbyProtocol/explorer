import styled from 'styled-components';
import { rem } from 'polished';

export const BrowserContainer = styled.div`
  display: grid;
  justify-content: center;
`;
export const BrowserDiv = styled.div`
  height: ${rem(500)};
  max-width: ${rem(1400)};
  min-width: ${rem(1220)};
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  box-shadow: 0 15px 25px -10px rgba(43, 55, 74, 0.152644);
`;
export const Top = styled.div`
  height: ${rem(200)};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
`;
export const Bottom = styled.div``;
