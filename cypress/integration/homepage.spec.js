describe('Home Page', () => {
  context('iphone 6 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });
    describe('When you visit home', () => {
      it('Visit home page', () => {
        cy.visit('/');
        cy.contains('h2', '物置シェアサービス「モノオク」').should('be.visible');
      });
    });
  });
});
