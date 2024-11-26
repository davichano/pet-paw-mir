describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visita la página de login
  });

  it('should display validation errors for empty fields', () => {
    cy.get('[aria-label="LOGIN"]').click(); // Envía el formulario vacío
    cy.contains('Username is required'); // Verifica el mensaje de error para el username
    cy.contains('Password is required'); // Verifica el mensaje de error para la contraseña
  });

  it('should log in successfully with valid credentials', () => {
    // Simula una respuesta del backend exitosa
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { id: 1, username: 'testuser', role: 'USER', email: 'testuser@example.com' },
    }).as('loginRequest');

    cy.intercept('GET', '/api/users/email/testuser@example.com', {
      statusCode: 200,
      body: { id: 1, username: 'testuser', pets: [] },
    }).as('userFetch');

    cy.get('input[placeholder="Enter your username"]').type('testuser'); // Ingresa un usuario
    cy.get('input[placeholder="Enter your password"]').type('password123'); // Ingresa la contraseña
    cy.get('button[type="submit"]').click(); // Envía el formulario

    // Espera que las llamadas al backend se completen
    cy.wait('@loginRequest');
    cy.wait('@userFetch');

    // Verifica la redirección
    cy.url().should('include', '/feed'); // Comprueba si fue redirigido al feed
  });

  it('should show an error message for invalid credentials', () => {
    // Simula un error de inicio de sesión
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginRequest');

    cy.get('input[placeholder="Enter your username"]').type('wronguser'); // Usuario incorrecto
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword'); // Contraseña incorrecta
    cy.get('button[type="submit"]').click(); // Envía el formulario

    // Espera que la llamada al backend se complete
    cy.wait('@loginRequest');

    // Verifica que se muestra el mensaje de error
    cy.contains('Incorrect username or password').should('be.visible');
  });

  it('should navigate to the signup page', () => {
    cy.contains('Create Account').click(); // Haz clic en el botón para crear cuenta
    cy.url().should('include', '/signup'); // Comprueba si fue redirigido a /signup
  });
});
