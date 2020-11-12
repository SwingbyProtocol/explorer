import * as mockTx from './mockTx';
describe('Website', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('./tx_mock_data.json').then((rc) => {
      mockTx.getMockedTxs(rc);
    });
    cy.visit('/');
    cy.wait('@getMockedTxs');
  });
  it('render correctly', () => {
    cy.viewport(1400, 1400);
    cy.percySnapshot('Website', { widths: [1400] });
  });
});
