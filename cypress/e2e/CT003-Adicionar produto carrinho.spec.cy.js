const dados = require('../fixtures/dados.json')

describe('Adicionar produto ao carrinho', () => {

  beforeEach(() => {
    cy.login_app(dados.email, dados.password)
  });

  /*afterEach(() => {
    cy.limpar_carrinho()
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


  it('Validar compras com valor <= R$ 990,00', () => {
    let quant = '14'
    var valor = '990,00'
    const valor_01 = parseFloat(valor.replace(',', '.'));
    cy.log(valor_01)


    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.xpath('//*[@id="cart"]/a/span[2]/span/bdi/text()').invoke('text').then(parseFloat)
      .should('be.a', 'number')
      .and('be.lessThan', valor_01)
  })


  it('Valor de compra < R$ 200,00 não deve gerar cupom de desconto', () => {
    let quant = '2'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath('//*[@id="main"]/div/div[3]/div/table/tbody/tr[1]/td/span/bdi/text()').invoke('text').then(($value_1) => {
      cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_2) => {

        var valor_01 = parseFloat($value_1)
        var valor_02 = parseFloat($value_2)

        expect(valor_01).to.eq(valor_02)
        expect(valor_01).to.be.lessThan(200)
      })
    })
  })

  // ------------------------------------------------------------------------------

  it('Validar mensagem de erro ao adicionar mais de 10 itens do mesmo produto no carrinho', () => {
    let quant = '11'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').should('contain', 'Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho.')
  })

  it('Validar mensagem de erro quando o valor de uma compra ultrapassar R$ 990,00', () => {
    let quant = '15'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').should('contain', 'Os valores não podem ultrapassar a R$ 990,00.')
  })

  it('Valor de compra >= R$ 200,00 deve gerar cupom de 10% de desconto', () => {
    let quant = '3'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor / 10))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.eq(valor_desconto)
    })
  })

  it('Valor de compra <= R$ 600,00 deve gerar cupom de 10% de desconto', () => {
    let quant = '8'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor / 10))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.eq(valor_desconto)
    })
  })

  it('Valor de compra >= R$ 600,00 deve gerar cupom de 15% de desconto', () => {
    let quant = '9'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor / 15))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.eq(valor_desconto)
    })
  })

  it.only('Intercept Abominable', () => {
    cy.intercept({
      method: 'GET',
      utl: 'wp-admin/admin-ajax*',
      query: {
        term: 'Abominable'
      }
    })
    
    
    cy.get('#tbay-header > div.header-main.clearfix > div > div > div > div.search.col-md-6.hidden-sm.hidden-xs > div > form > div > div > input.tbay-search.form-control.input-sm').type('Abominable')
    
  });

})