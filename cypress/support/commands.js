// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (email, password) => {

  cy.visit('/login')

  // Alias para elementos comunes
  cy.get('input[placeholder="User or email"]').as('usernameInput');
  cy.get('input[placeholder="Password"]').as('passwordInput');
  cy.get('[aria-label="LOGIN"]').as('loginButton');

  cy.get('@usernameInput').type(email);

  // {enter} causes the form to submit
  cy.get('@passwordInput').type(password);

  cy.get('@loginButton').click();

})

Cypress.Commands.add('goToPostDetails', (postIndex = 1) => {
  // Verifica que estamos en la página de Feed
  cy.url().should('include', '/feed');

  // Asegúrate de que haya suficientes publicaciones
  cy.get('.grid > div').should('have.length.greaterThan', postIndex);

  cy.get('.grid > div').should('have.length.greaterThan', 1);


    cy.get('.grid > div').eq(1).click();
    cy.url().should('match', /\/pet\/\d+$/);
    cy.get('img[alt="Pet"]').should('be.visible');
});




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
