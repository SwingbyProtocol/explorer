import { Text } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';

import { ILiquidityRatio } from '../../../../metanodes';
import { TextRoom } from '../../../Common';

import {
  Bar,
  BarBond,
  ColumnStatus,
  ContainerStatus,
  LiquidityRatioContainer,
  OptimalPoint,
  RowTitle,
  StatusIcon,
} from './styled';

interface Props {
  liquidityRatio: ILiquidityRatio[] | null;
  isLoading: boolean;
}

export const LiquidityRatio = (props: Props) => {
  const { liquidityRatio, isLoading } = props;
  const { formatMessage } = useIntl();

  const btcRation = liquidityRatio && liquidityRatio[0];

  const bridgedRation = liquidityRatio && liquidityRatio[1];

  return (
    <LiquidityRatioContainer isLoading={isLoading}>
      <RowTitle>
        <div>
          <Text variant="section-title">
            <FormattedMessage id="metanodes.liquidity-ration" />
          </Text>
        </div>

        <ContainerStatus>
          <ColumnStatus>
            <StatusIcon status="COMPLETED" />
            <TextRoom variant="label">{liquidityRatio && btcRation.currency}</TextRoom>
          </ColumnStatus>
          <ColumnStatus>
            <StatusIcon status="SIGNING" />
            <TextRoom variant="label">{liquidityRatio && bridgedRation.currency}</TextRoom>
          </ColumnStatus>
        </ContainerStatus>
      </RowTitle>

      {(() => {
        if (!liquidityRatio) {
          return (
            <Bar>
              <BarBond widthPercentage={60} />
              <OptimalPoint
                optimalBondPercentage={50}
                label={formatMessage({ id: 'metanodes.bond-to-liquidity.optimal' })}
              />
            </Bar>
          );
        }

        return (
          <Bar>
            <BarBond widthPercentage={Number(btcRation.fraction) * 100} />
          </Bar>
        );
      })()}
    </LiquidityRatioContainer>
  );
};
