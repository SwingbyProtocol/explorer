import { localTheme } from 'src/styles/localTheme';
import styled from 'styled-components';

export const TitleSpan = styled.span`
  color: ${localTheme.colors.greyBlack};
  /* color: ${({ theme }) => theme.pulsar.color.text.masked}; */
  font-size: 1.6rem;
  font-weight: bold;
  opacity: 0.5;
`;
