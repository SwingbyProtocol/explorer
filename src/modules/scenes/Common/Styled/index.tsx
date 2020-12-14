import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

interface LoadingProps {
  isLoading: boolean;
}

export const IconInfo = styled(Icon.InfoCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;

export const Atag = styled.a`
  text-decoration: none;
`;

export const IconArrowLeft = styled(Icon.ArrowLeft)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  cursor: pointer;
`;

export const LineBox = styled.div<LoadingProps>`
  opacity: ${(props) => props.isLoading && 0.1};
  transition: all 1s ease 0s;
`;
