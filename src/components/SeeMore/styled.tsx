import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const SeeMoreRow = styled.div`
  padding: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SeeMoreColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${rem(100)};
  cursor: pointer;
`;

export const IconLinkArrow = styled(Icon.CaretRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;
