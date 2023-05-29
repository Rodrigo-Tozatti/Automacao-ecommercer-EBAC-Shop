
import { faker } from '@faker-js/faker';
const dados = require ('../fixtures/dados.json')

describe('Cadastro de usuário', () => {

  beforeEach(() => {
    cy.visit('')
  });

  it('Cadastrar novo usuário com sucesso', () => {
    let email_faker = faker.internet.email()
    let senha_faker = faker.internet.password()

    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').type(email_faker)
    cy.get('#reg_password').type(senha_faker)
    cy.get(':nth-child(4) > .button').click()

    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, ')
  })

  it('Validar mensagem de alerta de senha com 3 caracteres', () => {
    cy.Validar_senha('rodrigo.ebac@ebacshop.com', 'Rod')
    cy.get('.woocommerce-password-strength').should('contain', 'Muito fraca - Digite uma senha segura.')
  });

  it('Validar mensagem de alerta de senha com 8 caracteres', () => {
    cy.Validar_senha('rodrigo.ebac@ebacshop.com', 'Rodrigo@')
    cy.get('.woocommerce-password-strength').should('contain', 'Fraca - Digite uma senha segura.')
  });

  it('Validar mensagem de alerta de senha com 10 caracteres', () => {
    cy.Validar_senha('rodrigo.ebac@ebacshop.com', 'Rodrigo@eb')
    cy.get('.woocommerce-password-strength').should('contain', 'Médio')
  });

  it('Validar mensagem de alerta de senha com 11 caracteres', () => {
    cy.Validar_senha('rodrigo.ebac@ebacshop.com', 'Rodrigo@eb')
    cy.get('.woocommerce-password-strength').should('contain', 'Forte')
  });
})

