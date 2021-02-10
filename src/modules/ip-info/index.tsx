import { GetServerSideProps } from 'next';

import { server__ipCheckSecret } from '../env';
import { fetch } from '../fetch';

export const getIpInfoFromRequest = async ({
  req,
}: {
  req: Parameters<GetServerSideProps>[0]['req'];
}) => {
  const ip =
    (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null) ??
    req.connection.remoteAddress ??
    null;

  return {
    ip,
    shouldBlockIp: await (async () => {
      try {
        const result = await fetch<{ shouldBlock: boolean }>(
          `https://ip-check.swingby.network/api/v1/ip/${ip}/check?secret=${server__ipCheckSecret}`,
        );

        if (!result.ok) {
          return false;
        }

        return result.response.shouldBlock;
      } catch (e) {
        return false;
      }
    })(),
  };
};
