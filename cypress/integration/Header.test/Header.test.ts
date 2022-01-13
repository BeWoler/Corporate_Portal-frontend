describe("Header test", () => {
  it("Has header on page", () => {
    cy.visit("/login");

    cy.get("header");
  });

  it("Header has title", () => {
    cy.get(".header__title a").should("have.text", "Corporate Portal");
  });

  it("Header has signIn & signUp links", () => {
    cy.get(".header__signBtns a:first-child").should("have.text", "Sign In");
    cy.get(".header__signBtns a:last-child").should("have.text", "Sign Up");
  });

  it("Redirecting when user click on links", () => {
    cy.get(".header__signBtns a:last-child").click();
    expect(cy.url().should("include", "/registration"));

    cy.get(".header__signBtns a:first-child").click();
    expect(cy.url().should("include", "/login"));
  });

  it("Header after auth has user avatar & user email", () => {
    cy.get('input[placeholder="Username"]').type("test");
    cy.get('input[placeholder="Password"]').type("1234");

    cy.get("button").click();

    cy.get(".avatar");
    cy.get(".userBar__user").should("have.text", "test@test.com");
  });
});
