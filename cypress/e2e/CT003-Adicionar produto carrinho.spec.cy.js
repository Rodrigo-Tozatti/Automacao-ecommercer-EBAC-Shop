const dados = require ('../fixtures/dados.json')

describe('Adicionar produto ao carrinho', () => {

  beforeEach(() => {
    cy.visit('')
    cy.login_plataforma(dados.email, dados.password)
  });

  it('Adicionar produto ao carrinho com sucesso', () => {
    let produto = 'Abominable Hoodie'
    let tamanho = 'M'
    let cor = 'Blue'
    let quantidade = '2'

    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.product-block').contains(produto).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()

    cy.get('.woocommerce-message').should('contain', quantidade +' × “Abominable Hoodie” foram adicionados no seu carrinho.')
  })
})