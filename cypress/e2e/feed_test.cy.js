describe('Feed page', () => {
  beforeEach(() => {
    // Visita la página de login antes de cada prueba
    cy.login("gmachicaoq@unsa.edu.pe", "LEG@RD29pros")
  });

  it('passes', () => {
    cy.url().should('include', '/feed')
    cy.get('[data-sonner-toast]').should('contain', 'Login successful');
  })
})
