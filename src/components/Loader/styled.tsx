import { rem } from 'polished';
import styled from 'styled-components';

interface LoaderProps {
  minHeight: number;
  marginTop: number;
}

export const LoadContainer = styled.div<LoaderProps>`
  display: flex;
  margin-top: ${(props) => rem(props.marginTop)};
  align-items: ${(props) => !props.marginTop && 'center'};
  justify-content: center;
  min-height: ${(props) => rem(props.minHeight)};
`;
