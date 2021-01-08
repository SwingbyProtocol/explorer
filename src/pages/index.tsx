import { getIpInfoFromRequest, IpInfoFromRequest } from '@swingby-protocol/ip-check';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { ipApiKey } from '../modules/env';
import { getUsdPrice, IFetchUsd } from '../modules/explorer';
import { Main } from '../modules/scenes';
import { fetchUsdPrice } from '../modules/store';

type Props = { ipInfo: IpInfoFromRequest; initialPriceUSD: IFetchUsd };

export default function Home({ ipInfo, initialPriceUSD }: Props) {
  const dispatch = useDispatch();
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(
    ipInfo?.shouldBlockRegion,
  );

  useEffect(() => {
    dispatch(fetchUsdPrice(initialPriceUSD));
  }, [dispatch, initialPriceUSD]);

  return (
    <>
      <NoServiceToUSModal
        isWidgetModalOpen={isNoServiceToUSModalOpen}
        setIsWidgetModalOpen={setIsNoServiceToUSModalOpen}
      />
      <Main />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const ipInfo = await getIpInfoFromRequest({ req, ipApiKey });

  const initialPriceUSD = await (async (): Promise<IFetchUsd> => {
    try {
      return await getUsdPrice();
    } catch (e) {
      console.log(e);
    }
  })();

  return { props: { ipInfo, initialPriceUSD } };
};
