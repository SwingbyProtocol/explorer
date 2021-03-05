import { GetServerSideProps } from 'next';

import { server__ipCheckSecret } from '../env';
import { AbortController, fetch } from '../fetch';

export const getIpInfoFromRequest = async ({
  req,
}: {
  req: Parameters<GetServerSideProps>[0]['req'];
}) => {
  const ip = (() => {
    try {
      const value =
        (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null) ??
        req.connection.remoteAddress;

      if (!value) {
        return null;
      }

      return value;
    } catch (e) {
      console.error('Error getting IP', e);
      return null;
    }
  })();

  return {
    ip,
    shouldBlockIp: await (async () => {
      try {
        if (!ip) {
          return false;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => controller.abort(), 3000);
        const result = await fetch<{ shouldBlock: boolean }>(
          `https://ip-check.swingby.network/api/v1/ip/${ip}/check?secret=${server__ipCheckSecret}`,
          { signal },
        );

        if (!result.ok) {
          return false;
        }

        return result.response.shouldBlock;
      } catch (e) {
        console.error('Error locating IP', e);
        return false;
      }
    })(),
  };
};
