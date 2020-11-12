import { DateTime } from 'luxon';

describe('Website', () => {
  it('render correctly', () => {
    cy.viewport(1400, 1400);

    cy.server();
    cy.route('**/swaps/query**', 'fixture:tx_mock_data.json');

    cy.clock(DateTime.fromISO('2020-11-11T10:00:00.000Z').toJSDate());
    cy.visit('/');
    cy.tick(1000);

    cy.get('[data-testid="main.loading-container"]').should('not.exist');
    cy.percySnapshot('Website', { widths: [1400] });
  });
});
