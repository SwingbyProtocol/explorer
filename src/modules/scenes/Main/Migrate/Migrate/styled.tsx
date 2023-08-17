import { Card } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';
import QRCodeSVG from 'qrcode.react';

import { ButtonScale } from '../../../Common';
import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const MigrateContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const MigrateDiv = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
    background-color: ${({ theme }) => (theme.pulsar.id === 'PulsarLight' ? '#FFF' : '#2A3039')};
  }
  @media (min-width: ${rem(media.md)}) {
    min-height: ${rem(500)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(980)};
    margin: 0 auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1100)};
  }
`;

export const MigratePanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const MigratePanel = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.masked};
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.normal};
`;

export const MigrateChainContainer = styled.div`
  width: ${rem(262)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};

  > :first-child {
    margin-left: ${rem(20)} !important;
    margin-right: ${rem(20)} !important;
  }
`;

export const MigrateChain = styled(ButtonScale)`
  width: ${rem(100)};
  text-decoration: underline;
`;

export const MigrateChainAnchor = styled.a`
  cursor: pointer;
`;

export const MigrateQrCode = styled(QRCodeSVG)`
  background-color: ${({ theme }) => (theme.pulsar.id === 'PulsarLight' ? '#FFF' : '#FFF')};
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const MigrateQrCodeDescription = styled.div`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const MigrateAddressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const MigrateAddress = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};

  > :first-child {
    flex-shrink: 0;
  }
`;

export const MigrateAddressText = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MigrateAddressAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  text-decoration: none;
  cursor: pointer;
`;
