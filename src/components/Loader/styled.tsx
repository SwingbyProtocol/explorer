import { rem } from 'polished';
import styled from 'styled-components';

interface LoaderProps {
  minHeight: number;
}

export const LoadContainer = styled.div<LoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => rem(props.minHeight)};
`;
