export const getMockedTxs = (response) => {
  let endpoint = 'https://tbtc-goerli-1.swingby.network/api/v1/swaps/query?page_size=4';
  cy.route({
    method: 'GET',
    url: endpoint,
    response,
  }).as('getMockedTxs');
};
