import { Text } from '@swingby-protocol/pulsar';
import { Big } from 'big.js';
import { FormattedMessage, useIntl } from 'react-intl';

import { ILiquidity } from '../../../../metanodes';
import { TextRoom } from '../../../Common';

import {
  Bar,
  BarBond,
  BondToLiquidityContainer,
  ColumnStatus,
  ContainerStatus,
  OptimalPoint,
  RowTitle,
  StatusIcon,
  TextStatus,
} from './styled';

interface Props {
  liquidity: ILiquidity | null;
}

export const BondToLiquidity = (props: Props) => {
  const { liquidity } = props;
  const { formatMessage } = useIntl();

  const status = liquidity && liquidity.status;

  return (
    <BondToLiquidityContainer isLoading={!liquidity}>
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

      {(() => {
        if (!liquidity) {
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

        const total = new Big(liquidity.liquidity).add(liquidity.bond);
        const bondFraction = +new Big(liquidity.bond).div(total).toFixed();

        return (
          <Bar>
            <BarBond widthPercentage={bondFraction * 100} />
            <OptimalPoint
              optimalBondPercentage={+liquidity.optimalBondFraction * 100}
              label={formatMessage({ id: 'metanodes.bond-to-liquidity.optimal' })}
            />
          </Bar>
        );
      })()}
      <div>
        <TextRoom variant="label">
          <FormattedMessage id="metanodes.status" />{' '}
        </TextRoom>
        <TextStatus variant="label">{status}</TextStatus>
      </div>
    </BondToLiquidityContainer>
  );
};
