#language: pt

Funcionalidade: Adicionar produto ao carrinho
Como usuário do site EBAC-SHOP
Quero Adicionar um produto ao carrinho

Regras do Negócio

1 - Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho.
2 - Os valores não podem ultrapassar a R$ 990,00
3 - Valores entre R$ 200 e R$ 600 , ganham cupom de 10%
4 - Valores acima de R$ 600 ganham cupom de 15%

Cenário: Adicionar produto ao carrinho com sucesso
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu clicar no <produto> desejado
E definir as especificações <size>, <color>, <quantidade>
E clicar no botão comprar
Então deve exibir a <mensagem> de sucesso

        Examples:
            | produto           | size | color | quantidade | mensagem                                            |
            | Abominable Hoodie | M    | Blue  | 1          | “Abominable Hoodie” foi adicionado no seu carrinho. |


Cenário: Validar compras com quantidade <= 10 itens do mesmo produto
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se a <quantidade do produto> for maior <= 10
Então deve exibir a <mensagem>

        Examples:
            | produto           | quantidade do produto | mensagem                                                                  |
            | Abominable Hoodie | 10                    | 10 × “Abominable Hoodie” foram adicionados no seu carrinho.               |


Cenário: Validar mensagem de erro ao adicionar mais de 10 itens do mesmo produto no carrinho
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se a <quantidade do produto> for maior 10
Então deve exibir a <mensagem> de erro

        Examples:
            | produto           | quantidade do produto | mensagem                                                                  |
            | Abominable Hoodie | 11                    | Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho. |


Cenário: Validar compras com valor <= R$ 990,00
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se o <valor da compra> ultrapassar R$ 900,00
Então deve exibir a <mensagem> de erro

        Examples:
            | produto           | valor da compra | mensagem                                               |
            | Abominable Hoodie | 990,00          | "Abominable Hoodie” foram adicionados no seu carrinho. |
            

Cenário: Validar mensagem de erro quando o valor de uma compra ultrapassar R$ 990,00
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se o <valor da compra> ultrapassar R$ 900,00
Então deve exibir a <mensagem> de erro

        Examples:
            | produto           | valor da compra | mensagem                                      |
            | Abominable Hoodie | 990,01          | Os valores não podem ultrapassar a R$ 990,00. |


Cenário: Valor de compra < R$ 200,00 não deve gerar cupom de desconto
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se o <valor da compra> for < R$ 200,00
Então não deve deve gerar <cupom> de desconto

        Examples:
            | produto           | valor da compra | cupom |
            | Abominable Hoodie | 199,99          | 0%    |


Cenário: Validar cupom de 10% de desconto para compras entre R$ 200,00 e R$ 600,00
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se o <valor da compra> estiver entre 200,00 e R$ 600,00
Então deve exibir <cupom> de 10% de desconto

        Examples:
            | produto           | valor da compra | cupom |
            | Abominable Hoodie | 199,99          | 0%    |
            | Abominable Hoodie | 200,00          | 10%   |
            | Abominable Hoodie | 600,00          | 10%   |
            | Abominable Hoodie | 600,01          | 15%   |






Cenário: Validar cupom de 15% de desconto para compras acima de R$ 600,00
Dado que eu acesse a página de produtos da EBAC-Shop
Quando eu comprar o <produto> desejado
Se o <valor da compra> for acima de R$ 600,00
Então deve exibir <cupom> de 10% de desconto

        Examples:
            | produto           | valor da compra | cupom |
            | Abominable Hoodie | 600,00          | 10%   |
            | Abominable Hoodie | 600,01          | 15%   |
