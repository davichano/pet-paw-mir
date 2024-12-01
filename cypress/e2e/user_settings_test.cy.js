describe("User settings page", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);

    cy.login("gmachicaoq@unsa.edu.pe", "LEG@RD29pros");

    cy.url().should("include", "/feed");
    cy.get("[data-sonner-toast]").should(($toast) => {
      const text = $toast.text();
      expect(text === "Login successful" || text === "Inicio de sesión exitoso")
        .to.be.true;
    });

    cy.contains("a", /Profile|Perfil/).click();
    cy.url().should("include", "/user/");
    cy.get("#user-info").find("button").click();
    cy.contains("a", "Edit").click();

    cy.url().should("include", "/settings");
  });

  it("should update description and gender, then verify the toast", () => {
    cy.url().should("include", "/settings");

    // Actualiza los campos del formulario
    cy.get('textarea[name="description"]')
      .clear()
      .type("This is my updated description.");
    cy.get('select[name="gender"]').select("Female");

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica el toast de Sonner
    cy.get("[data-sonner-toast]").should(($toast) => {
      const text = $toast.text();
      expect(
        text === "Actualizado correctamente" || text === "Updated correctly"
      ).to.be.true;
    });
  });

  it("should update name, last name, and birthdate, then verify the toast", () => {
    cy.url().should("include", "/settings");

    cy.get("li").then(($listItems) => {
      if ($listItems.text().includes("User details")) {
        cy.contains("li", "User details").click();
      } else if ($listItems.text().includes("Detalles del usuario")) {
        cy.contains("li", "Detalles del usuario").click();
      }
    });

    // Actualiza los campos del formulario
    cy.get('input[name="name"]').clear().type("John"); // Modifica el campo de nombre
    cy.get('input[name="lastName"]').clear().type("Doe"); // Modifica el campo de apellido
    cy.get('input[name="birthDate"]').clear().type("1990-01-01"); // Modifica el campo de fecha de nacimiento

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica el toast de Sonner
    cy.get("[data-sonner-toast]").should(($toast) => {
      const text = $toast.text();
      expect(
        text === "Actualizado correctamente" || text === "Updated correctly"
      ).to.be.true;
    });
  });

  it("should log out and navigate to the login page", () => {
    cy.url().should("include", "/settings");

    // Haz clic en el elemento <li> que contiene "Logout"
    cy.get("li").then(($listItems) => {
      if ($listItems.text().includes("Logout")) {
        cy.contains("li", "Logout").click();
      } else if ($listItems.text().includes("Cerrar sesión")) {
        cy.contains("li", "Cerrar sesión").click();
      }
    });

    // Verifica que redirige a /login
    cy.url().should("include", "/login");
  });
});
