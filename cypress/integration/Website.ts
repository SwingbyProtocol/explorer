describe('Website', () => {
  it('render correctly', () => {
    cy.viewport(1400, 1400);

    cy.server();
    cy.route('**/swaps/query', 'fixture:tx_mock_data.json');
    cy.visit('/');

    cy.get('[data-testid="main.loading-container"]').should('not.exist');
    cy.percySnapshot('Website', { widths: [1400] });
  });
});
