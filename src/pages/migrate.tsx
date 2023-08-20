import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Layout } from '../components/Layout';
import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { fetchVwap, IFetchUsd } from '../modules/explorer';
import { getIpInfoFromRequest } from '../modules/ip-info';
import { Main } from '../modules/scenes';
import { fetchUsdPrice } from '../modules/store';

type Props = { shouldBlockIp: boolean; initialPriceUSD: IFetchUsd };

export default function Migrate({ shouldBlockIp, initialPriceUSD }: Props) {
  const dispatch = useDispatch();
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(shouldBlockIp);

  useEffect(() => {
    dispatch(fetchUsdPrice(initialPriceUSD));
  }, [dispatch, initialPriceUSD]);

  return (
    <Layout>
      <NoServiceToUSModal
        isWidgetModalOpen={isNoServiceToUSModalOpen}
        setIsWidgetModalOpen={setIsNoServiceToUSModalOpen}
      />
      <Main />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const initialPriceUSD = await (async (): Promise<IFetchUsd> => {
    try {
      const results = await Promise.all([fetchVwap('btcUsd'), fetchVwap('swingbyUsd')]);

      const priceUSD = {
        BTC: results[0],
        SWINGBY: results[1],
      };

      return priceUSD;
    } catch (e) {
      console.log(e);
    }
  })();

  return { props: { ...(await getIpInfoFromRequest({ req })), initialPriceUSD } };
};
