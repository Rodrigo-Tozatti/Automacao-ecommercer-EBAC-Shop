// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Validar_senha', (email, password) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(password)
})

Cypress.Commands.add('login_plataforma', (email, password) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('.woocommerce-form > .button').click()
})