describe("Feed page", () => {
  beforeEach(() => {
    cy.login("gmachicaoq@unsa.edu.pe", "LEG@RD29pros");
  });

  it("passes for login feed", () => {
    cy.url().should("include", "/feed");
    cy.get("[data-sonner-toast]").should(($toast) => {
      const text = $toast.text();
      expect(text === "Login successful" || text === "Inicio de sesión exitoso")
        .to.be.true;
    });

    cy.get(".grid > div").should("exist");
  });
});

describe("Details Publication", () => {
  beforeEach(() => {
    cy.login("gmachicaoq@unsa.edu.pe", "LEG@RD29pros");
  });

  it("navigates to the second post and displays its description", () => {
    cy.url().should("include", "/feed");

    cy.get(".grid > div").should("have.length.greaterThan", 1);

    cy.get(".grid > div").eq(1).click();
    cy.url().should("match", /\/pet\/\d+$/);
    cy.get('img[alt="Pet"]').should("be.visible");
  });
});
