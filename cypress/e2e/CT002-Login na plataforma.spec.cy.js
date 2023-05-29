const dados = require ('..//fixtures/dados.json')

describe('Login na plataforma', () => {
  beforeEach(() => {
    cy.visit('')
  });

  it('Fazer login na plataforma EBAC-Shop com sucesso', () => {
    cy.login_plataforma(dados.email, dados.password)
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'rodrigo.ebac')
  })

  it('Fazer login na plataforma EBAC-Shop com usuário inválido', () => {
    cy.login_plataforma('123_ebac@teste.com', dados.password)
    cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
  })

  it('Fazer login na plataforma EBAC-Shop com senha inválida', () => {
    cy.login_plataforma(dados.email, '123@teste.com')
    cy.get('.woocommerce-error > li').should('contain', 'Erro: a senha fornecida para o e-mail rodrigo.ebac@ebacshop.com está incorreta. Perdeu a senha?')
  })
})