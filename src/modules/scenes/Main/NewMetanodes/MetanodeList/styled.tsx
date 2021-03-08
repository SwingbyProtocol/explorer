import { SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { TextRoom } from '../../../Common';

const { media } = StylingConstants;

export const MetanodeListContainer = styled.div`
  /* background-color: ${({ theme }) => theme.pulsar.color.bg.hover}; */
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  @media (min-width: ${rem(media.md)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const NodeContainer = styled.div`
  text-align: center;
`;

export const ColumnLeft = styled.div`
  text-align: left;
`;

export const ColumnCenter = styled.div`
  text-align: center;
`;

const nodeListGridTemplateColumnsFrameMobile = `10% 10% ${rem(120)} auto ${rem(100)}`;
const nodeListGridTemplateColumnsFrameSM = `10% 5% ${rem(120)} 10% auto auto ${rem(150)}`;
const nodeListGridTemplateColumnsFrameMD = `10% 10% ${rem(120)} 15% auto auto ${rem(150)}`;
const nodeListGridTemplateColumnsFrame = `25% 15% 20% 20% 20%`;

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

export const Row = styled.div`
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

export const Location = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-items: center;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
`;

export const ImgFlag = styled.img`
  width: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const StatusIcon = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const NodeStatus = styled.div``;

export const ChurnStatus = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  align-items: center;
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
`;

export const TextStatus = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-weight: 700;
`;

export const Column = styled.div``;

export const TextNowrap = styled(TextRoom)`
  white-space: nowrap;
  display: block;
`;
