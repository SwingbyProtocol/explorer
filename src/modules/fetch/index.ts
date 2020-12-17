import originalFetch from 'isomorphic-unfetch';

export const fetch = async <SuccessResponse extends unknown>(
  url: Parameters<typeof originalFetch>[0],
  optionsParam?: Parameters<typeof originalFetch>[1],
): Promise<
  | { ok: true; status: number; response: SuccessResponse }
  | { ok: false; status: number; response: string }
> => {
  const options: typeof optionsParam = {
    ...optionsParam,
    headers: {
      'Content-Type': 'application/json',
      ...optionsParam?.headers,
    },
  };

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
