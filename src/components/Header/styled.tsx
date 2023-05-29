import styled from 'styled-components';

export const HeaderContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '216px' : '72px')};
  right: 0;
  display: flex;
  justify-content: space-between;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  transition: all 0.2s linear;
  z-index: 20;
`;

export const HeaderAction = styled.div`
  align-self: flex-end;
`;
