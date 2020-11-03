import styled from 'styled-components';

export const DescribeSpan = styled.span`
  font-size: 1.4rem;
  opacity: 0.7;
  color: ${({ theme }) => theme.pulsar.color.text.normal};
`;

export const TitleSpan = styled.span`
  font-size: 1.6rem;
  opacity: 0.5;
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  font-weight: bold;
`;
