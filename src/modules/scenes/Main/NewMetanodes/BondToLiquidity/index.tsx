import { Text } from '@swingby-protocol/pulsar';
import { FormattedMessage, useIntl } from 'react-intl';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Big } from 'big.js';
import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { TextRoom } from '../../../Common';
import { fetcher } from '../../../../fetch';

import {
  BondToLiquidityContainer,
  RowTitle,
  BarContainer,
  ColumnStatus,
  ContainerStatus,
  TextStatus,
  Bar,
  BarBond,
  BarLiquidity,
  OptimalPoint,
  StatusIcon,
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
  const status = 'Optimal';

  const { data } = useSWR<ApiData>(
    `https://metanode-earnings.vercel.app/api/v1/production/${bridge}/bond-to-liquidity`,
    fetcher,
  );

  // Memo: Will delete later

  // const [bond, setBond] = useState(0);
  // const total = new Big(data.liquidity).add(data.bond);
  // const liquidityFraction = +new Big(data.liquidity).div(total).toFixed();
  // const bondFraction = +new Big(data.bond).div(total).toFixed();

  // const [total, setTotal] = useState(1);
  // const [liquidityFraction, setLiquidityFraction] = useState(1);
  // const [bondFraction, setBondFraction] = useState(1);

  // Memo: animation 0% => 80%
  // useEffect(() => {
  //   // setTimeout(() => {
  //   // setBond(80);
  //   data &&
  //     (async () => {
  //       setTotal(Number(new Big(data?.liquidity).add(data.bond)));
  //       setLiquidityFraction(
  //         await Number(liquidityFraction + new Big(data?.liquidity).div(total).toFixed()),
  //       );
  //       setBondFraction(await Number(bondFraction + new Big(data?.bond).div(total).toFixed()));
  //     })();
  //   // }, 2000);
  // }, [data, total, bondFraction, liquidityFraction]);

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
            <BarLiquidity widthPercentage={liquidityFraction * 100} />
            <OptimalPoint
              optimalBondPercentage={+data.optimalBondFraction * 100}
              label={formatMessage({ id: 'metanodes.bond-to-liquidity.optimal' })}
            />
          </Bar>
        );
      })()}
      <div>
        <TextRoom variant="label">
          <FormattedMessage id="metanodes.status" />
        </TextRoom>{' '}
        <TextStatus variant="label">{status}</TextStatus>
      </div>
    </BondToLiquidityContainer>
  );
};
