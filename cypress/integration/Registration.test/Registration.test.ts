import "cypress-localstorage-commands";

describe("Registration test", () => {
  it("Should have a form", () => {
    cy.visit("/registration");

    cy.get("input").should("have.value", "");
    cy.get("button").should("have.text", "Sign Up");
    cy.get(".signIn").should("have.text", "Sign In");
  });

  it("Form can be with data", () => {
    cy.get('input[placeholder="Email"]')
      .type("cypress")
      .should("have.value", "cypress");
    cy.get('input[placeholder="Username"]')
      .type("cypress")
      .should("have.value", "cypress");
    cy.get('input[placeholder="First Name"]')
      .type("FirstName")
      .should("have.value", "FirstName");
    cy.get('input[placeholder="Last Name"]')
      .type("LastName")
      .should("have.value", "LastName");
    cy.get('input[placeholder="Password"]')
      .type("123456")
      .should("have.value", "123456");
  });

  it("Send request with not valid email", () => {
    cy.get("button").click();
    cy.get(".error").should("have.text", "Validation error");
    cy.wait(500);
  });

  it("Send request with existing email", () => {
    cy.get('input[placeholder="Email"]').type("bewoler@gmail.com");
    cy.get('input[placeholder="Username"]').type("cypress");
    cy.get('input[placeholder="First Name"]').type("FirstName");
    cy.get('input[placeholder="Last Name"]').type("LastName");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get("button").click();
    cy.get(".error").should("have.text", "Email already exist");
    cy.wait(500);
  });

  it("Send request with existing username", () => {
    cy.get('input[placeholder="Email"]').type("testtesttest@gmail.com");
    cy.get('input[placeholder="Username"]').type("BeWoler");
    cy.get('input[placeholder="First Name"]').type("FirstName");
    cy.get('input[placeholder="Last Name"]').type("LastName");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get("button").click();
    cy.get(".error").should("have.text", "Username already exist");
    cy.wait(500);
  });

  it("Send request with not valid password", () => {
    cy.get('input[placeholder="Email"]').type("cypress@cypress.com");
    cy.get('input[placeholder="Username"]').type("cypress");
    cy.get('input[placeholder="First Name"]').type("FirstName");
    cy.get('input[placeholder="Last Name"]').type("LastName");
    cy.get('input[placeholder="Password"]').type("12");

    cy.get("button").click();
    cy.get(".error").should("have.text", "Validation error");
    cy.wait(500);
  });

  it("Send a valid request and get a token", () => {
    cy.get('input[placeholder="Email"]').type("newtestcypress@cypress.com");
    cy.get('input[placeholder="Username"]').type("cypress12345");
    cy.get('input[placeholder="First Name"]').type("FirstName");
    cy.get('input[placeholder="Last Name"]').type("LastName");
    cy.get('input[placeholder="Password"]').type("1234");

    cy.get("button").click();
    cy.wait(500);
    cy.url().should("include", "/board");
    cy.getLocalStorage("token").then((token: string) => cy.log(token));
  });
});
