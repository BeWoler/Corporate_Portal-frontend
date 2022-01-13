export const login = () => {
  cy.visit("/login");

  cy.get('input[placeholder="Username"]').type("test");
  cy.get('input[placeholder="Password"]').type("1234");

  cy.get("button").click();
};
