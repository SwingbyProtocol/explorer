import { DateTime } from 'luxon';

describe('Main page', () => {
  it('render correctly', () => {
    cy.viewport(1400, 1400);

    cy.server();
    cy.route(/goerli.+swaps\/query\?page=0/, 'fixture:transaction-query.json');
    cy.route(/goerli.+swaps\/query\?page=1/, 'fixture:transaction-query-empty.json');
    cy.route(/testnet-node/, 'fixture:transaction-query-empty.json');

    cy.clock(DateTime.fromISO('2020-11-11T10:00:00.000Z').toJSDate());
    cy.visit('/');
    cy.tick(1000);

    cy.get('[data-testid="main.loading-container"]').should('not.exist');
    cy.percySnapshot('Website', { widths: [1400] });
  });
});
