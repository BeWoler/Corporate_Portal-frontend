export const login = () => {
  cy.visit("/login");

  cy.get('input[placeholder="Username"]')
    .type("test")
    .should("have.value", "test");
  cy.get('input[placeholder="Password"]').type("1234");

  cy.get("button").click();
};
