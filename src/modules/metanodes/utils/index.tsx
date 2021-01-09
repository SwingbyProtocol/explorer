import { INodeListResponse } from '..';
import { ENDPOINT_ETHEREUM_NODE } from '../../env';
import { camelize, fetch } from '../../fetch';

// Memo: get data from Next.js API function to bypass CORS error
const fetchNodeCountry = async (ip: string) => {
  const url = `/api/get-country?ip=${ip}`;
  try {
    const result = await fetch<{ country: string; code: string }>(url);
    const country = result.ok && result.response.country;
    const code = result.ok && result.response.code;
    return { country, code };
  } catch (e) {
    return { country: ip, code: null };
  }
};

export const fetchNodeList = async () => {
  const url = ENDPOINT_ETHEREUM_NODE + '/api/v1/peers';
  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return Promise.all(
      metanodes.map(async (node) => {
        try {
          const countryIP = node.p2pListener.split(':');
          const country = await fetchNodeCountry(countryIP[0]);
          return {
            location: country.country,
            code: country.code,
            moniker: node.moniker,
            stateName: node.stateName,
            stake: node.stake,
          };
        } catch (e) {
          console.log(e);
        }
      }),
    );
  } catch (e) {
    console.log(e);
  }
};
