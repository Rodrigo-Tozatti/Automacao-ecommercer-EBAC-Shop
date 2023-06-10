const dados = require('../fixtures/dados.json')

describe('Adicionar produto ao carrinho', () => {

  beforeEach(() => {
    cy.login_app(dados.email, dados.password)
  });

  it('Adicionar produto ao carrinho com sucesso', () => {
    cy.add_produto(dados.produto, dados.tamanho, dados.cor, dados.quantidade)
    cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.')
  })

  it('Validar compras com quantidade <= 10 itens do mesmo produto', () => {
    let quant = '10'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').invoke('text')
    .then((texto) => {
      const valor_01 = parseInt(texto.replace(/\D/g, '')); // remove todos os caracteres não numéricos
      cy.log(valor_01); // exibe os números no console do Cypress
      
      expect(valor_01).to.be.lessThan(11);
      cy.get('.woocommerce-message').should('contain', '10 × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });
  });

  it('Validar mensagem de erro ao adicionar mais de 10 itens do mesmo produto no carrinho', () => {
    let quant = '11'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message').invoke('text')
    .then((texto) => {
      const valor_01 = parseInt(texto.replace(/\D/g, '')); // remove todos os caracteres não numéricos
      cy.log(valor_01); // exibe os números no console do Cypress
      
      expect(valor_01).to.be.greaterThan(10);
      cy.get('.woocommerce-message').should('contain', 'Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho.')
    });
  })

  it('Validar compras com valor <= R$ 990,00', () => {
    let quant = '14'
    var valor = '990,00'
    const numeroTexto = valor.replace('.', '');//.replace(',', '');
    const valor_01 = parseFloat(numeroTexto);
    
    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.xpath('//*[@id="cart"]/a/span[2]/span/bdi/text()').invoke('text').then((texto) => {
      const numeroTexto = texto.replace('.', '');
      const valor_02 = parseFloat(numeroTexto);

      expect(valor_02).to.be.lessThan(valor_01);
      cy.get('.woocommerce-message').should('contain', '14 × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });
  })

  it('Validar mensagem de erro quando o valor de uma compra ultrapassar R$ 990,00', () => {
    let quant = '15'
    var valor = '990,00'
    const numeroTexto = valor.replace('.', '');//.replace(',', '');
    const valor_01 = parseFloat(numeroTexto);
    
    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.xpath('//*[@id="cart"]/a/span[2]/span/bdi/text()').invoke('text').then((texto) => {
      const numeroTexto = texto.replace('.', '');
      const valor_02 = parseFloat(numeroTexto);

      expect(valor_02).to.be.lessThan(valor_01);
      cy.get('.woocommerce-message').should('contain', 'O valor da compra não podem ultrapassar a R$ 990,00.')
    });
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

  it('Valor de compra >= R$ 200,00 deve gerar 10% de desconto', () => {
    let quant = '3'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor / 10))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.greaterThan(200)
      expect(valor).to.be.eq(valor_desconto)
    })
  })

  it('Valor de compra <= R$ 600,00 deve gerar cupom de 10% de desconto', () => {
    let quant = '8'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor * 0.10))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.lessThan(601)
      expect(valor).to.be.eq(valor_desconto)
    })
  })

  it('Valor de compra > R$ 600,00 deve gerar cupom de 15% de desconto', () => {
    let quant = '9'

    cy.add_produto(dados.produto, dados.tamanho, dados.cor, quant)
    cy.get('.woocommerce-message > .button').click()

    cy.xpath(`//*[@id="main"]/div/div[3]/div/table/tbody/tr[2]/td/strong/span/bdi/text()`).invoke('text').then(($value_1) => {

      var valor = parseFloat($value_1)

      var desconto = ((valor * 0.15))
      var valor_desconto = (valor - desconto)

      expect(valor).to.be.greaterThan(600)
      expect(valor).to.be.eq(valor_desconto)
    })
  })
})