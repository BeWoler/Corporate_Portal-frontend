import "cypress-localstorage-commands";

describe("Login test", () => {
  it("Should have a form", () => {
    cy.visit("/login");

    cy.get("input").should("have.value", "");
    cy.get("button").should("have.text", "Sign In");
    cy.get(".signUp").should("have.text", "Sign Up");
  });

  it("Form can be with data", () => {
    cy.get('input[placeholder="Username"]')
      .type("cypress")
      .should("have.value", "cypress");
    cy.get('input[placeholder="Password"]')
      .type("cypresspassword")
      .should("have.value", "cypresspassword");
  });

  it("Send request and get an error that there is no such user", () => {
    cy.get("button").click();
    cy.get(".error").should("have.text", "User does not exist");
  });

  it("Send request and get an error that password is wrong", () => {
    cy.get('input[placeholder="Username"]')
      .type("BeWoler")
      .should("have.value", "1");
    cy.get('input[placeholder="Password"]')
      .type("12345")
      .should("have.value", "12345");

    cy.get("button").click();
    cy.get(".error").should("have.text", "Incorrect password");
  });

  it("Send a valid request and get a token", () => {
    cy.get('input[placeholder="Username"]')
      .type("BeWoler")
      .should("have.value", "test");
    cy.get('input[placeholder="Password"]')
      .type("1234")
      .should("have.value", "1234");

    cy.get("button").click();
    cy.url().should("include", "/board");
    cy.getLocalStorage("token").then((token: string) => cy.log(token));
  });
});
