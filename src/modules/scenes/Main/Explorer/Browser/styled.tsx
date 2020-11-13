import styled from 'styled-components';
import { rem } from 'polished';
import { Card } from '@swingby-protocol/pulsar';

interface IsReadyProps {
  isReady: boolean;
}

export const BrowserContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const BrowserDiv = styled(Card)`
  max-width: ${rem(1400)};
  min-width: ${rem(1220)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Top = styled.div<IsReadyProps>`
  height: ${rem(200)};
  display: ${(props) => (props.isReady ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const Bottom = styled.div<IsReadyProps>`
  display: ${(props) => !props.isReady && 'none'};
`;

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${rem(643)};
`;
