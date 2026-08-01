// 09 — Cypress E2E (TypeScript)

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log in with valid credentials', () => {
    cy.get('input[name=email]').type('alice@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, Alice');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name=email]').type('alice@example.com');
    cy.get('input[name=password]').type('wrong');
    cy.get('button[type=submit]').click();
    cy.contains('Invalid credentials');
  });

  it('should redirect when not logged in', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
});

describe('Search flow', () => {
  beforeEach(() => {
    cy.login('alice', 'password');  // custom command
  });

  it('should find matching items', () => {
    cy.get('input[type=search]').type('widget');
    cy.get('[data-testid=item]').should('contain', 'Widget');
  });
});

// === Cypress custom commands (cypress/support/commands.ts) ===
// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('/login');
//   cy.get('input[name=email]').type(email);
//   cy.get('input[name=password]').type(password);
//   cy.get('button[type=submit]').click();
// });

// === Intercept network requests ===
describe('API mocking', () => {
  it('should handle 404 from API', () => {
    cy.intercept('GET', '/api/users/999', {
      statusCode: 404,
      body: { error: 'not found' },
    });
    cy.visit('/users/999');
    cy.contains('User not found');
  });

  it('should display error from API', () => {
    cy.intercept('GET', '/api/users/1', {
      statusCode: 500,
      body: { error: 'server error' },
    });
    cy.visit('/users/1');
    cy.contains('Something went wrong');
  });
});

// === cypress.config.ts ===
// export default defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:4200',
//     viewportWidth: 1280,
//     viewportHeight: 720,
//     specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
//   },
// });