import styled from 'styled-components';

export const DescribeSpan = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const TitleSpan = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-weight: bold;
`;
