import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { useEffect, useState } from 'react';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { fetch } from '../modules/fetch';
import { Main } from '../modules/scenes';

export default function Home() {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(null);
  const getIpAddress = async () => {
    // Memo: Free plan => only can use 1K requests per month
    const url = 'https://api.ipify.org/?format=json';
    const result = await fetch<{ ip: string }>(url);
    const ipAddress = result.ok && result.response.ip;
    return ipAddress;
  };

  useEffect(() => {
    (async () => {
      const ipInfo = await (async () => {
        try {
          return await getIpInfo({
            ip: await getIpAddress(),
            ipstackApiKey: IPSTACK_API_KEY,
          });
        } catch (e) {
          return e.message;
        }
      })();
      setIsNoServiceToUSModalOpen(shouldBlockRegion(ipInfo));
    })();
  }, []);

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
