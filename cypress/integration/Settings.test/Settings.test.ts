import { login } from "../../loginFunction";

describe("Settings test", () => {
  it("Has settings page", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();

    cy.get("div").should("have.class", "settings__container");
    cy.wait(500);
  });

  it("Page has title", () => {
    cy.get("h2").should("have.text", "Editing Profile");
  });

  it("Page has container with settings", () => {
    cy.get("div").should("have.class", "settings__box");
  });

  it("Page has form with buttons", () => {
    cy.get("form")
      .should("have.class", "settings__btnForm")
      .get("a.settings__btn")
      .should(($a) => {
        expect($a).to.have.length(3);
        expect($a[0]).to.contain("Change Password");
        expect($a[1]).to.contain("Change Avatar");
        expect($a[2]).to.contain("Delete Profile");
      });
  });

  it("Page has form with inputs", () => {
    cy.get("form")
      .should("have.class", "settings__form")
      .get("div.settings__data")
      .should("have.class", "settings__data")
      .get("input")
      .should("have.value", "")
      .should(($input) => expect($input).to.have.length(10))
      .get('textarea[placeholder="Stack"]')
      .should("have.value", "")
      .get('textarea[placeholder="Education"]')
      .should("have.value", "")
      .get('textarea[placeholder="Description"]')
      .should("have.value", "");

    cy.get("button").should("have.text", "Save Changes");
  });

  it("Input and textareas can be with data", () => {
    cy.get('input[placeholder="First Name"]')
      .type("Test")
      .should("have.value", "Test");
    cy.get('input[placeholder="Last Name"]')
      .type("Test")
      .should("have.value", "Test");
    cy.get('input[placeholder="City"]')
      .type("Minsk")
      .should("have.value", "Minsk");
    cy.get('input[placeholder="Age"]')
      .type("1999-11-11")
      .should("have.value", "1999-11-11");
    cy.get('input[placeholder="Phone"]')
      .type("375225998554")
      .should("have.value", "375225998554");
    cy.get('textarea[placeholder="Stack"]')
      .type("Js, React")
      .should("have.value", "Js, React");
    cy.get('input[placeholder="Position"]')
      .type("Junior")
      .should("have.value", "Junior");
    cy.get('input[placeholder="Department"]')
      .type("Department")
      .should("have.value", "Department");
    cy.get('textarea[placeholder="Education"]')
      .type("MRC")
      .should("have.value", "MRC");
    cy.get('input[placeholder="Skype"]')
      .type("skype")
      .should("have.value", "skype");
    cy.get('textarea[placeholder="Description"]')
      .type("Something about me")
      .should("have.value", "Something about me");
    cy.get('input[name="Private"]').click().should("have.value", "on");
    cy.get('input[name="PrivateMessage"]').click().should("have.value", "on");
  });

  it("User can save changes", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(5).click();

    cy.get('input[placeholder="First Name"]')
      .type("Test")
      .should("have.value", "Test");
    cy.get('input[placeholder="Last Name"]')
      .type("Test")
      .should("have.value", "Test");
    cy.get('input[placeholder="City"]')
      .type("Minsk")
      .should("have.value", "Minsk");
    cy.get('input[placeholder="Age"]')
      .type("1999-11-11")
      .should("have.value", "1999-11-11");
    cy.get('input[placeholder="Phone"]')
      .type("375225998554")
      .should("have.value", "375225998554");
    cy.get('textarea[placeholder="Stack"]')
      .type("Js, React")
      .should("have.value", "Js, React");
    cy.get('input[placeholder="Position"]')
      .type("Junior")
      .should("have.value", "Junior");
    cy.get('input[placeholder="Department"]')
      .type("Department")
      .should("have.value", "Department");
    cy.get('textarea[placeholder="Education"]')
      .type("MRC")
      .should("have.value", "MRC");
    cy.get('input[placeholder="Skype"]')
      .type("skype")
      .should("have.value", "skype");
    cy.get('textarea[placeholder="Description"]')
      .type("Something about me")
      .should("have.value", "Something about me");
    cy.get('input[name="Private"]').click().should("have.value", "on");
    cy.get('input[name="PrivateMessage"]').click().should("have.value", "on");

    cy.get("button").click();
    cy.get("h3.settings__notification").should(
      "have.text",
      "Successfully changed"
    );
  });
});
