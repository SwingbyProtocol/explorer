import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { useState } from 'react';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { Main } from '../modules/scenes';

export default function Home({ ipInfo }) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(ipInfo.blockRegion);
  console.log('ipInfo', ipInfo);

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

export const getServerSideProps = async ({ req }) => {
  const clientIp =
    (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null) ??
    req.connection.remoteAddress ??
    null;

  const ipInfo = await (async () => {
    try {
      if (!clientIp || !IPSTACK_API_KEY) return null;
      return await getIpInfo({
        ip: clientIp,
        ipstackApiKey: IPSTACK_API_KEY ?? '',
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

  return { props: { ipInfo: { ipInfo, clientIp, blockRegion } } };
};

// Memo: Legacy code. Will remove after test

// const getIpAddress = async () => {
//   // Memo: Free plan => Can use 1K requests per day
//   const url = 'https://ipapi.co/json/';
//   const result = await fetch<{ ip: string }>(url);
//   const ipAddress = result.ok && result.response.ip;
//   return ipAddress;
// };

// useEffect(() => {
//   (async () => {
//     const ipInfo = await (async () => {
//       try {
//         return await getIpInfo({
//           ip: await getIpAddress(),
//           ipstackApiKey: IPSTACK_API_KEY,
//         });
//       } catch (e) {
//         return e.message;
//       }
//     })();
//     setIsNoServiceToUSModalOpen(shouldBlockRegion(ipInfo));
//   })();
// }, []);
