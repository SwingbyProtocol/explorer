import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { getUsdPrice, IFetchUsd } from '../modules/explorer';
import { getIpInfoFromRequest } from '../modules/ip-info';
import { Main } from '../modules/scenes';
import { fetchUsdPrice } from '../modules/store';

type Props = { shouldBlockIp: boolean; initialPriceUSD: IFetchUsd };

export default function Home({ shouldBlockIp, initialPriceUSD }: Props) {
  const dispatch = useDispatch();
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(shouldBlockIp);

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
  const initialPriceUSD = await (async (): Promise<IFetchUsd> => {
    try {
      const results = await Promise.all([getUsdPrice('bitcoin'), getUsdPrice('swingby')]);

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
