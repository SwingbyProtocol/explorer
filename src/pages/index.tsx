import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { getUsdPrice, IFetchUsd } from '../modules/explorer';
import { Main } from '../modules/scenes';
import { fetchUsdPrice } from '../modules/store';

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type Props = {
  ipInfo: {
    blockRegion: boolean;
    clientIp: string | null;
    ipInfo: ThenArg<ReturnType<typeof getIpInfo>> | null;
  };
  initialPriceUSD: IFetchUsd;
};

export default function Home({ ipInfo, initialPriceUSD }: Props) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(ipInfo?.blockRegion);
  const dispatch = useDispatch();

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
  const clientIp =
    (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null) ??
    req.connection.remoteAddress ??
    null;

  const ipInfo = await (async () => {
    try {
      if (!clientIp || !IPSTACK_API_KEY) return null;
      return await getIpInfo({
        ip: clientIp,
        ipstackApiKey: IPSTACK_API_KEY,
      });
    } catch (e) {
      return null;
    }
  })();

  const blockRegion = (() => {
    try {
      if (!ipInfo) return false;
      return shouldBlockRegion(ipInfo);
    } catch (e) {
      return false;
    }
  })();

  const initialPriceUSD = await (async (): Promise<IFetchUsd> => {
    try {
      return await getUsdPrice();
    } catch (e) {
      console.log(e);
    }
  })();

  return {
    props: {
      ipInfo: { ipInfo, clientIp, blockRegion },
      initialPriceUSD,
    },
  };
};
