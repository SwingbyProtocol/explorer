import originalFetch from 'isomorphic-unfetch';
import { AbortController as AbortControllerPonyfill } from 'abortcontroller-polyfill/dist/cjs-ponyfill'; // eslint-disable-line import/no-internal-modules

import { logger } from '../logger';

export const AbortController = AbortControllerPonyfill as typeof window.AbortController;

export const fetch = async <
  SuccessResponse extends unknown,
  ErrorResponse extends unknown = string
>(
  url: Parameters<typeof originalFetch>[0],
  optionsParam?: Parameters<typeof originalFetch>[1],
): Promise<
  | { ok: true; status: number; response: SuccessResponse }
  | { ok: false; status: number; response: ErrorResponse }
> => {
  const options: typeof optionsParam = {
    ...optionsParam,
    headers: {
      'Content-Type': 'application/json',
      ...optionsParam?.headers,
    },
  };

  logger.trace(`Will call "%s" with: %j`, url, options);
  const result = await originalFetch(url, options);

  const response = await (async () => {
    const str = await result.text();
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  })();

  if (!result.ok) {
    return { ok: false, status: result.status, response: response?.message ?? response };
  }

  return { ok: true, status: result.status, response };
};

export const fetcher = async <Data extends unknown = unknown>(
  ...args: Parameters<typeof fetch>
) => {
  const result = await fetch<Data>(...args);
  if (!result.ok) {
    throw new Error(`${result.status}: ${result.response}`);
  }

  return result.response;
};

/**
 * ref: https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
 */

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (a: any): boolean => {
  return Array.isArray(a);
};

const isObject = (o: any): boolean => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const camelize = (o: any): any => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k: string) => {
      n[toCamel(k)] = camelize(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return camelize(i);
    });
  }

  return o;
};
