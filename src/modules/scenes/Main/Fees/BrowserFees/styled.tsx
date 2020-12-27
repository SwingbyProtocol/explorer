import { Card } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface BgProps {
  bg: boolean;
}

export const BrowserFeesContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    margin-top: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
  }
`;

export const BrowserFeesDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  justify-self: center;
  min-width: ${rem(290)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(500)};
  }
`;

export const FeesContainer = styled.div`
  text-align: center;
`;

const feeListGridTemplateColumnsFrameMobile = `0% 27% 5% 30% 5% 30% 0%`;
const feeListGridTemplateColumnsFrame = `0% 27% 5% 30% 5% 30% 0%`;

export const RowDescription = styled.div<BgProps>`
  display: grid;
  padding: ${rem(22)} ${rem(14)};
  align-items: center;
  border-top: ${rem(1)} solid ${({ theme }) => theme.pulsar.color.border.normal};
  grid-template-columns: ${feeListGridTemplateColumnsFrameMobile};
  background: ${(props) => !props.bg && props.theme.pulsar.color.bg.hover};
  @media (min-width: ${rem(media.sm)}) {
    padding: ${rem(22)} ${rem(0)};
    grid-template-columns: ${feeListGridTemplateColumnsFrame};
  }
`;

export const Column = styled.div`
  display: grid;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  grid-template-columns: ${feeListGridTemplateColumnsFrameMobile};
  padding: ${rem(0)} ${rem(14)};
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${feeListGridTemplateColumnsFrame};
    padding: 0;
  }
`;

export const BackIconBox = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;
