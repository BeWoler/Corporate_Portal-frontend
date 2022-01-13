import { login } from "../../loginFunction";
import "cypress-localstorage-commands";

describe("NavBar test", () => {
  it("Has nav on page", () => {
    login("test", "1234");

    cy.get("nav");
  });

  it("Has links into nav component", () => {
    cy.get("nav a").eq(0).should("have.text", "My Profile");
    cy.get("nav a").eq(1).should("have.text", "Friends");
    cy.get("nav a").eq(2).should("have.text", "Board");
    cy.get("nav a").eq(3).should("have.text", "Messages");
    cy.get("nav a").eq(4).should("have.text", "Users");
    cy.get("nav a").eq(5).should("have.text", "Settings");
    cy.get("nav a").eq(6).should("have.text", "Logout");
  });

  it("Redirect to the pages", () => {
    login("test", "1234");

    cy.get("nav a").eq(0).click();
    cy.url().should("include", "/profile/");
    cy.go("back");

    cy.get("nav a").eq(1).click();
    cy.url().should("include", "/friends/");
    cy.go("back");

    cy.get("nav a").eq(2).click();
    cy.url().should("include", "/board");
    cy.go("back");

    cy.get("nav a").eq(3).click();
    cy.url().should("include", "/chat");
    cy.go("back");

    cy.get("nav a").eq(4).click();
    cy.url().should("include", "/users");
    cy.go("back");

    cy.get("nav a").eq(5).click();
    cy.url().should("include", "/settings");
    cy.go("back");

    cy.get("nav a").eq(6).click();
    cy.url().should("include", "/login");
    cy.getCookies().then((cookie) => expect(cookie.length === 0));
    cy.getLocalStorage("token").should("equal", null);
  });
});
