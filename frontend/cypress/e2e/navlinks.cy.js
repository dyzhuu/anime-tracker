describe('Testing NavBar Links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should navigate to trending when clicked', () => {
    cy.contains('Trending').click();
    cy.url().should('include', '/trending'); // Replace with the expected URL of the about page
    cy.contains('Trending Anime'); // Replace with the text unique to the about page
  });
  it('Should navigate to top when clicked', () => {
    cy.contains('Top').click();
    cy.url().should('include', '/top'); // Replace with the expected URL of the about page
    cy.contains('Top Anime'); // Replace with the text unique to the about page
  });
  it('Should navigate to new releases when clicked', () => {
    cy.contains('New Releases').click();
    cy.url().should('include', '/new'); // Replace with the expected URL of the about page
    cy.contains('New Releases'); // Replace with the text unique to the about page
  });
});
