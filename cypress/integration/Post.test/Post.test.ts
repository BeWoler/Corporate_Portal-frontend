import { login } from "../../loginFunction";

describe("Post test", () => {
  it("User can create post", () => {
    const filePath = "testPic.jpg";
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get("form.posts__create").should("have.class", "posts__create");
    cy.get("input[type='file']").attachFile(filePath);
    cy.get("textarea[placeholder='Tell us something']").type("new test post");
    cy.get("button").contains("Create Post").click();
  });

  it("User like post", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get("div.post__likes svg").first().click();
    cy.get("div.post__likes span").first().should("have.text", "liked");
  });

  it("User comment post", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get("div.post__likes:first svg:last").click();
    cy.get('textarea[placeholder="Comment"]').should("have.value", "");
    cy.get("button[disabled]").contains("Add").first();
    cy.get('textarea[placeholder="Comment"]:first').type("new test comment");
    cy.get("button").contains("Add").first().should("not.be.a", "disabled");
    cy.get("button").contains("Add").first().click();
  });

  it("User edit post", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get("div.post__btns button:first").contains("Edit").click();
    expect(
      cy
        .get('textarea[placeholder="Enter new data"]')
        .first()
        .should("have.value", "")
    );

    cy.get('textarea[placeholder="Enter new data"]')
      .first()
      .type("new edited post");
    cy.get("button").contains("Save").first().click();
    expect(
      cy.get("p.post__text").first().should("have.text", "new edited post")
    );
  });

  it("User delete post", () => {
    login("test", "1234");

    cy.get("nav");
    cy.get("nav a").eq(0).click();

    cy.get("div.post__btns:first button:last").contains("Delete").click();
  });
});
