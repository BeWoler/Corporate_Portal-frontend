import { login } from "../../loginFunction";

describe("Change password test", () => {
  it("Has settings/password page", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();
    expect(cy.url().should("include", "/settings/password"));
  });

  it("Has title", () => {
    cy.get("h2").should("have.text", "Change Password");
  });

  it("Has form on page", () => {
    cy.get("form").should("have.class", "change__form");
  });

  it("Has inputs and btn", () => {
    cy.get('input[placeholder="Old Password"]').should("have.value", "");
    cy.get('input[placeholder="New Password"]').should("have.value", "");
    cy.get("button").contains("Change Password");
  });

  it("Send request with wrong old password", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();

    cy.get('input[placeholder="Old Password"]').type("123456789");
    cy.get('input[placeholder="New Password"]').type("newPassword");
    cy.get("button").contains("Change Password").click();
    cy.get("h3.error").should("have.text", "Incorrect old password");
  });

  it("Send request with not valid new password", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();

    cy.get('input[placeholder="Old Password"]').type("1234");
    cy.get('input[placeholder="New Password"]').type("12");
    cy.get("button").contains("Change Password").click();
    cy.get("h3.error").should("have.text", "Validation error");
  });

  it("Send request with equal password", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();

    cy.get('input[placeholder="Old Password"]').type("1234");
    cy.get('input[placeholder="New Password"]').type("1234");
    cy.get("button").contains("Change Password").click();
    cy.get("h3.error").should(
      "have.text",
      "The old password cannot be equal to the new password"
    );
  });

  it("Send request with the right password", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();

    cy.get('input[placeholder="Old Password"]').type("1234");
    cy.get('input[placeholder="New Password"]').type("12345");
    cy.get("button").contains("Change Password").click();
    expect(cy.url().should("include", "/login"));

    login("test", "12345");

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Password")
      .click();

    cy.get('input[placeholder="Old Password"]').type("12345");
    cy.get('input[placeholder="New Password"]').type("1234");
    cy.get("button").contains("Change Password").click();
    expect(cy.url().should("include", "/login"));
  });
});
