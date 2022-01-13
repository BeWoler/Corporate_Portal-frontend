import { login } from "../../loginFunction";
const pic = "./pic.jpg";

describe("Change Avatar test", () => {
  it("Has settings/avatar page", () => {
    login();

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Avatar")
      .click();
    expect(cy.url().should("include", "/settings/avatar"));
  });

  it("Has title", () => {
    cy.get("h2").should("have.text", "Change Avatar");
  });

  it("Has form on page", () => {
    cy.get("form").should("have.class", "upload__form");
  });

  it("Has avatar preview box", () => {
    cy.get("div.upload__avatar__preview").should(
      "have.class",
      "upload__avatar__preview"
    );
  });

  it("User can choose avatar", () => {
    const filePath = "testPic.jpg";
    const secondFilePath = "testPic2.jpg";
    const file = "installer.exe";
    cy.get('input[type="file"]').attachFile(filePath);
    cy.wait(800);
    cy.get('input[type="file"]').attachFile(secondFilePath);
    cy.wait(800);
    cy.get('input[type="file"]').attachFile(file);
  });

  it("User can change avatar", () => {
    const filePath = "testPic.jpg";
    login();

    cy.get("nav");
    cy.get("nav a").eq(5).click();
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .contains("Change Avatar")
      .click();

    cy.get('input[type="file"]').attachFile(filePath);
    cy.get("button").click();
  });
});
