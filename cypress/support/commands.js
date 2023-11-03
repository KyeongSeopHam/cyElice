Cypress.Commands.add('login', (email, pw) => {
    cy.get('input[name="loginId"]').type(email)
    cy.get('input[name="password"]').type(pw)
    cy.get('button[type="submit"]').click()
});

Cypress.Commands.add('snsClickCheck', (labels) => {
  labels.forEach((label) => {
    cy.get(`button[aria-label="${label}"]`).click();
  });
});
