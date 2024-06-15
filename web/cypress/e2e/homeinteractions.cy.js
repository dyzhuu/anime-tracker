describe('Interacts with elements on the home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should navigate to trending when clicked', () => {
    cy.get('h1').contains('Trending').click();
    cy.url().should('include', '/trending'); // Replace with the expected URL of the about page
    cy.contains('Trending Anime'); // Replace with the text unique to the about page
  });
  it('Should navigate to top when clicked', () => {
    cy.get('h1').contains('Top').click();
    cy.url().should('include', '/top'); // Replace with the expected URL of the about page
    cy.contains('Top Anime'); // Replace with the text unique to the about page
  });
  it('Should navigate to new releases when clicked', () => {
    cy.get('h1').contains('New Releases').click();
    cy.url().should('include', '/new'); // Replace with the expected URL of the about page
    cy.contains('New Releases'); // Replace with the text unique to the about page
  });

  it('Should be able to perform a successful search', () => {
    // Type a search query into the search bar
    cy.get('input[type="search"]:visible').type('Jujutsu');

    // Submit the search by clicking the search button or pressing Enter
    cy.get('div').contains('JUJUTSU KAISEN').should('be.visible') // Replace with the appropriate selector for your search button
  });

  it('Should be able to click an image to go to the page', () => {
    // Type a search query into the search bar
    cy.get('[aria-label="Anime Bar"]')
      .first()
      .within(() => {
        cy.get('[aria-label="Anime Card"]').first().click();
      });

    cy.url().should('include', '/anime/'); // Replace with the expected URL of the about page
      cy.contains('Description'); // Replace with the text unique to the about page
  });

});
