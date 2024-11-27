describe("User settings page", () => {
  it("should log in and navigate to the settings page", () => {
    cy.login("usuario@usuario.com", "usuario");

    cy.url().should("include", "/feed");
    cy.get("[data-sonner-toast]").should("contain", "Login successful");

    cy.contains("a", "Profile").click();
    cy.url().should("include", "/user/");
    cy.get("#user-info")
      .find("button")
      .click();
    cy.contains('a', 'Edit').click();
  });
});
