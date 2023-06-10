// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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

Cypress.Commands.add('add_produto', (produto, tamanho, cor, quantidade) => {
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.product-block').contains(produto).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
})

Cypress.Commands.add('limpar_carrinho', () => {
    cy.visit('carrinho/')
    cy.get('.remove > .fa').click()
})


Cypress.Commands.add('login_app', (username, password) => {
    const fd = new FormData()
    fd.append('username', username)
    fd.append('password', password)
    fd.append('woocommerce-login-nonce', '06e93a27f1')
    fd.append('_wp_http_referer', `minha-conta/`)
    fd.append('login', 'Login')

    cy.request({
        url: 'minha-conta/',
        method: 'POST',
        body: fd
    })
    cy.visit('minha-conta/')
})
