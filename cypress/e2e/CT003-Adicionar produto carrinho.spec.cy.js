const dados = require('../fixtures/dados.json')

describe('Adicionar produto ao carrinho', () => {

  beforeEach(() => {
    cy.visit('')
    cy.login_plataforma(dados.email, dados.password)
  });

  /*afterEach(() => {
    cy.get('.logo-in-theme > .logo > a > .logo-img').click()
    cy.limpa_carrinho()
  });*/

  it('Adicionar produto ao carrinho com sucesso', () => {
    cy.add_produto(dados.produto, dados.tamanho, dados.cor, dados.quantidade)
    cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.')
  })

  it('Validar compras com quantidade <= 10 itens do mesmo produto', () => {
    let quant = '10'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').should('contain', quant + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
  });

  it('Validar mensagem de erro ao adicionar mais de 10 itens do mesmo produto no carrinho', () => {
    let quant = '11'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').should('contain', 'Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho.')
  })



  it.only('Validar compras com valor <= R$ 990,00', () => {
    let quant = '14'
    var valor = '990'
    const valor_01 = parseFloat(valor.replace(','));
    cy.log(valor_01)

    

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.xpath('//*[@id="cart"]/a/span[2]/span/bdi/text()').invoke('text').then(parseFloat)
      .should('be.a', 'number')
      .and('be.lessThan', valor_01)

  })



  it('Validar mensagem de erro quando o valor de uma compra ultrapassar R$ 990,00', () => {
    let quant = '15'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').should('contain', 'Os valores não podem ultrapassar a R$ 990,00.')
  })

  it('Valor de compra < R$ 200,00 não deve gerar cupom de desconto', () => {
    let quant = '2'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.get('#main > div > div.cart-collaterals.widget > div > table > tbody > tr.cart-subtotal > td > span').invoke('text').then((subtotal) => {
      cy.get('#main > div > div.cart-collaterals.widget > div > table > tbody > tr.order-total > td > strong > span').invoke('text').then((total) => {
        expect(subtotal).to.eq(total)
      })
    })
    //cy.get('.remove > .fa').click()
  })

})