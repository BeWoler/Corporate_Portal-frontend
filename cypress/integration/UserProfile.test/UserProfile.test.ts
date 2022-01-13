import { login } from "../../loginFunction";

describe("UserProfile test", () => {
  it("Has user profile", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get(".profile__container").should("have.class", "profile__container");
    cy.get(".profile__container")
      .find(".profile__first__column")
      .should("have.class", "profile__first__column");
    cy.get(".profile__container")
      .find(".profile__second__column")
      .should("have.class", "profile__second__column");
  });

  it("User has avatar", () => {
    cy.get(".MuiAvatar-root.MuiAvatar-square").should("have.text", "Test");
  });

  it("User has first name and last name", () => {
    cy.get(".profile__name").should("have.class", "profile__name");
  });

  it("User has about data", () => {
    cy.get(".profile__about").should("have.class", "profile__about");
  });

  it("User has form for create a post", () => {
    cy.get("form.posts__create").should("have.class", "posts__create");
  });

  it("User has profile info", () => {
    cy.get("ul.profile__info").should("have.class", "profile__info");
  });

  it("User has box with friends", () => {
    cy.get("div.userFriends__container").should(
      "have.class",
      "userFriends__container"
    );
    cy.get("h3.userFriends__title").should("have.contain.text", "Friends");
  });
});
