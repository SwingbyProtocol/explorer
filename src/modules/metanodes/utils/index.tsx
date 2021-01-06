import { fetchNodeCountry, INodeListResponse } from '..';
import { ENDPOINT_ETHEREUM_NODE } from '../../env';
import { camelize, fetch } from '../../fetch';

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
