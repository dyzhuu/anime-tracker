describe('Scroll down triggers load', () => {
  beforeEach(() => {
    cy.visit('/new');
  });

  it('Should load more content as the user scrolls down', () => {
    cy.intercept('POST', (req) => {
      // Here, you can perform assertions on the intercepted request, if needed
      expect(req.method).to.equal('POST');
    });

    // Scroll down to trigger infinite scroll
    cy.scrollTo('bottom');
  });
});
