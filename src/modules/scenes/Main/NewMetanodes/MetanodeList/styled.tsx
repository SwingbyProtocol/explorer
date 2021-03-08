import { SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { TextBlock, TextRoom } from '../../../Common';

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

const nodeListGridTemplateColumnsFrameMobile = `1fr 1fr`;
const nodeListGridTemplateColumnsFrameSM = `33% 33% auto`;
const nodeListGridTemplateColumnsFrame = `25% 10% 20% 20% 25%`;

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
    display: grid;
    align-items: center;
    padding: 0;
    grid-template-columns: ${nodeListGridTemplateColumnsFrameSM};
  }

  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrameMobile};
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrameSM};
  }

  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${nodeListGridTemplateColumnsFrame};
  }
`;

export const Location = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  align-items: center;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
  }
`;

export const ImgFlag = styled.img`
  width: ${({ theme }) => rem(theme.pulsar.size.town)};
  @media (min-width: ${rem(media.sm)}) {
    width: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
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

export const BoxAddress = styled.div``;
export const RowAddress = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
  align-items: center;
`;

export const ColumnAddress = styled.div`
  width: ${rem(100)};
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(146)};
  }
`;

export const ColumnExpiry = styled.div`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
  }
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    display: block;
  }
`;

export const ColumnNodeName = styled.div`
  max-width: ${rem(100)};
  @media (min-width: ${rem(media.xs)}) {
    max-width: ${rem(140)};
  }
  @media (min-width: ${rem(media.sm)}) {
    max-width: ${rem(90)};
  }
  @media (min-width: ${rem((media.sm + media.md) / 2)}) {
    max-width: ${rem(140)};
  }
  @media (min-width: ${rem(media.md)}) {
    max-width: ${rem(300)};
  }
`;

export const TextNodeName = styled(TextBlock)`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
