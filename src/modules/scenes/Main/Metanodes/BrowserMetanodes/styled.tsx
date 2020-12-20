import { Card } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { NODES_PER_PAGE } from '../../../../env';
import { StylingConstants } from '../../../../styles';
import { TextEllipsis } from '../../../Common';

const { media } = StylingConstants;

interface BgProps {
  bg: boolean;
}

export const BrowserMetanodesContainer = styled.div`
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
`;

export const BrowserMetanodesDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  min-height: ${rem(73.4 * NODES_PER_PAGE)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
    min-height: ${rem(500)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
  }
`;

export const NodeContainer = styled.div`
  text-align: center;
`;

const nodeListGridTemplateColumnsFrameMobile = `10% 10% ${rem(120)} auto ${rem(100)}`;
const nodeListGridTemplateColumnsFrameSM = `10% 5% ${rem(120)} 10% auto auto ${rem(150)}`;
const nodeListGridTemplateColumnsFrameMD = `10% 10% ${rem(120)} 15% auto auto ${rem(150)}`;
const nodeListGridTemplateColumnsFrame = `7% 5% ${rem(120)} 5% 15% 2% ${rem(180)} auto`;

export const RowDescription = styled.div<BgProps>`
  display: grid;
  padding: ${rem(22)} ${rem(14)};
  align-items: center;
  border-top: ${rem(1)} solid ${({ theme }) => theme.pulsar.color.border.normal};
  grid-template-columns: ${nodeListGridTemplateColumnsFrameMobile};
  background: ${(props) => !props.bg && props.theme.pulsar.color.bg.hover};
  @media (min-width: ${rem(media.sm)}) {
    padding: ${rem(22)} ${rem(0)};
    grid-template-columns: ${nodeListGridTemplateColumnsFrameSM};
  }
  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrameMD};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrame};
  }
`;

export const StakeInfos = styled.div`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    display: block;
    max-width: 93%;
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    max-width: 100%;
  }
`;

export const TextStake = styled(TextEllipsis)`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    max-width: 100%;
    width: 100%;
  }
  @media (min-width: ${rem(media.lg)}) {
    display: block;
    max-width: ${rem(370)};
  }
  @media (min-width: ${rem(media.xl)}) {
    display: block;
    max-width: ${rem(400)};
  }
`;

export const Column = styled.div`
  display: grid;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  grid-template-columns: ${nodeListGridTemplateColumnsFrameMobile};
  padding: ${rem(0)} ${rem(14)};
  @media (min-width: ${rem(media.sm)}) {
    padding: 0;
    grid-template-columns: ${nodeListGridTemplateColumnsFrameSM};
  }
  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrameMD};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrame};
  }
`;
