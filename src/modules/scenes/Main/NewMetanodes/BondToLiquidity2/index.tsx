import { SkybridgeBridge } from '@swingby-protocol/sdk';
import useSWR from 'swr';
import { Big } from 'big.js';
import { FormattedMessage, useIntl } from 'react-intl';

import { fetcher } from '../../../../fetch';

import {
  Bar,
  BarBond,
  BarLiquitidity,
  Container,
  OptimalPoint,
  LegendBond,
  LegendContainer,
  LegendLiquidity,
} from './styled';

type ApiData = {
  status: 'overbonded' | 'underbonded' | 'optimal';
  bond: string;
  liquidity: string;
  optimalBondFraction: string;
  overbondedBondFraction: string;
};

export const BondToLiquidity = ({ bridge }: { bridge: SkybridgeBridge }) => {
  const { formatMessage } = useIntl();
  const { data } = useSWR<ApiData>(
    `https://metanode-earnings.vercel.app/api/v1/production/${bridge}/bond-to-liquidity`,
    fetcher,
  );

  return (
    <Container>
      <LegendContainer>
        <LegendBond>
          <FormattedMessage id="metanodes.bond-to-liquidity.bonded" />
        </LegendBond>
        <LegendLiquidity>
          <FormattedMessage id="metanodes.bond-to-liquidity.liquidity" />
        </LegendLiquidity>
      </LegendContainer>

      {(() => {
        if (!data) {
          return <Bar />;
        }

        const total = new Big(data.liquidity).add(data.bond);
        const liquidityFraction = +new Big(data.liquidity).div(total).toFixed();
        const bondFraction = +new Big(data.bond).div(total).toFixed();

        return (
          <Bar>
            <BarBond widthPercentage={bondFraction * 100} />
            <BarLiquitidity widthPercentage={liquidityFraction * 100} />
            <OptimalPoint
              optiomalBondPercentage={+data.optimalBondFraction * 100}
              label={formatMessage({ id: 'metanodes.bond-to-liquidity.optimal' })}
            />
          </Bar>
        );
      })()}
    </Container>
  );
};
