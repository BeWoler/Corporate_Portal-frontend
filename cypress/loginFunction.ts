export const login = (username: string, password: string) => {
  cy.visit("/login");

  cy.get('input[placeholder="Username"]').type(username);
  cy.get('input[placeholder="Password"]').type(password);

  cy.get("button").click();
};
