import { apiUrl } from "../../apiUrl";

describe("Login request test", () => {
  it("Request with wrong username", () => {
    cy.visit("/login");
    cy.request({
      method: "POST",
      url: apiUrl + "/login",
      body: {
        username: "BeeeeeeeWoler",
        password: "cypress123214",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("User does not exist");
    });
  });

  it("Request with wrong password", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/login",
      body: {
        username: "BeWoler",
        password: "1111111111",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Incorrect password");
    });
  });

  it("Request with the right data", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/login",
      body: {
        username: "BeWoler",
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
