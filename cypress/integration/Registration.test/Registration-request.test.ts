import { apiUrl } from "../../apiUrl";

describe("Registration request test", () => {
  it("Request with not valid email", () => {
    cy.visit("/registration");
    cy.request({
      method: "POST",
      url: apiUrl + "/registration",
      body: {
        email: "cypress",
        username: "cypress",
        firstName: "First",
        lastName: "Last",
        password: "cypress123214",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Validation error");
    });
  });

  it("Request with existing email", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/registration",
      body: {
        email: "test@test.com",
        username: "cypress",
        firstName: "First",
        lastName: "Last",
        password: "cypress123214",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Email already exist");
    });
  });

  it("Request with existing username", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/registration",
      body: {
        email: "cypress@cypress.com",
        username: "test",
        firstName: "First",
        lastName: "Last",
        password: "cypress123214",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Username already exist");
    });
  });

  it("Request with not valid password", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/registration",
      body: {
        email: "cypress@cypress.com",
        username: "cypress",
        firstName: "First",
        lastName: "Last",
        password: "12",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Validation error");
    });
  });

  it("Request with the right data", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/registration",
      body: {
        email: "cypress@cypress.com",
        username: "cypress",
        firstName: "First",
        lastName: "Last",
        password: "1234",
      },
      failOnStatusCode: true,
    }).then((res) => {
      expect(res.status).to.eq(200);
      cy.getCookie("refreshToken");
      cy.getCookie("role");
      cy.getCookie("username");
    });
  });
});
