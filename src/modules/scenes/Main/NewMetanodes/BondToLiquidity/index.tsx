import { Text } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';

import { TextRoom } from '../../../Common';

import {
  BondToLiquidityContainer,
  RowTitle,
  BarContainer,
  ColumnStatus,
  ContainerStatus,
  TextStatus,
  StatusIcon,
} from './styled';

export const BondToLiquidity = () => {
  const [bond, setBond] = useState(0);
  const status = 'Optimal';

  // Memo: animation 0% => 80%
  useEffect(() => {
    setTimeout(() => {
      setBond(80);
    }, 2000);
  }, []);

  return (
    <BondToLiquidityContainer>
      <RowTitle>
        <div>
          <Text variant="section-title">
            <FormattedMessage id="metanodes.bond-to-liquidity" />
          </Text>
        </div>

        <ContainerStatus>
          <ColumnStatus>
            <StatusIcon status="COMPLETED" />
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.swingby-bond" />
            </TextRoom>
          </ColumnStatus>
          <ColumnStatus>
            <StatusIcon status="SIGNING" />
            <TextRoom variant="label">
              <FormattedMessage id="metanodes.locked-liquidity" />
            </TextRoom>
          </ColumnStatus>
        </ContainerStatus>
      </RowTitle>
      <BarContainer>
        <ProgressBar
          completed={bond}
          bgcolor="#31D5B8"
          baseBgColor="#F3BE06"
          height="8px"
          isLabelVisible={false}
        />
      </BarContainer>
      <div>
        <TextRoom variant="label">
          <FormattedMessage id="metanodes.status" />
        </TextRoom>{' '}
        <TextStatus variant="label">{status}</TextStatus>
      </div>
    </BondToLiquidityContainer>
  );
};
