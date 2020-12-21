import { Button, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../styles';

interface LoadingProps {
  isLoading: boolean;
}

const { media } = StylingConstants;

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

export const TextPrimary = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const TextSecondary = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.secondary.normal};
`;

export const TextDanger = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.danger.normal};
`;

export const TextBlock = styled(Text)`
  display: block;
`;

export const TextEllipsis = styled(TextBlock)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SizeS = styled.div`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
  }
`;

export const ButtonScale = styled(Button)`
  transition: all 0.3s ease 0s;
  :hover {
    transition: all 0.3s ease 0s;
    transform: scale(1.05);
  }
`;
