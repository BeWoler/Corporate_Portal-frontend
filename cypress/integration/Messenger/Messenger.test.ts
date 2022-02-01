import { login } from "../../loginFunction";
import "cypress-localstorage-commands";

describe("Messenger test", () => {
  it("Has chat page", () => {
    login("BeWoler", "1234");
    cy.wait(1000);
    cy.visit("/chat");
    cy.get("div").should("have.class", "messengerPage__container");
    cy.wait(500);
  });

  it("Can choose conversation", () => {
    cy.get("div").should("have.class", "conversation");
    cy.get(".conversation__users").click();
  });

  it("Can type and send message", () => {
    cy.get("textarea[placeholder='Message']").type("new test message");
    cy.get("button").contains("Send").click();
  });

  it("Found new message", () => {
    cy.get(".message__text");
    cy.get("span").contains("new test message");
  });
});
