describe('Post Details - Write and View Comment', () => {
  beforeEach(() => {
    // Login y navegación inicial
    cy.login('gmachicaoq@unsa.edu.pe', 'LEG@RD29pros');
  });

  it('writes a comment and verifies it appears in the list', () => {
    // Accede al detalle del segundo post
    cy.goToPostDetails(1);

    const commentText = 'Este es un comentario de prueba';

    cy.get('input[placeholder="Escribe un comentario..."]').type(commentText);
    cy.get('button').find('img[src="/src/assets/img/Icons/submit_message.svg"]').click();


    cy.get('.overflow-auto').children().first().should('contain', commentText);
  });
});

describe('Pet Info Modal', () => {
  beforeEach(() => {

    cy.login('gmachicaoq@unsa.edu.pe', 'LEG@RD29pros');
    cy.goToPostDetails(1);
  });

  it('opens the pet info modal', () => {

    cy.get('button').find('img[src="/src/assets/img/Icons/info.svg"]').click();
    cy.wait(1000);
    cy.get('div[role="dialog"]').should('be.visible');
  });
});

