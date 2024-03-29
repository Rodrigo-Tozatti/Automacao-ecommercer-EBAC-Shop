#language: pt

Funcionalidade: Login na plataforma
Como usuário do site EBAC-SHOP
Quero fazer login na plataforma EBAC-Shop

Regras do Negócio

1 - Quando digitado usuário inexistente deve exibir a mensagem:
    Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.
2 - Quando digitado usuário correto e senha incorreta deve exibir a mensagem:
    Erro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?

Cenário: Fazer login na plataforma EBAC-Shop com sucesso
Dado que eu acesse a página de login
Quando eu digitar <Username or email address> e <Password> válidos
E clicar no botão login
Então deve acessar a página "Minha Conta" e exibir <mensagem> de sucesso

        Examples:
            | Username or email address | Password       | mensagem                                     |
            | rodrigo.ebac@ebacshop.com | Rodrigo@ebac01 | Olá, rodrigo.ebac (não é rodrigo.ebac? Sair) |


Cenário: Fazer login na plataforma EBAC-Shop com usuário inválido
Dado que eu acesse a página de login
Quando eu digitar <Username or email address> e <Password>
E clicar no botão login
Então deve acessar exibir <mensage> de alerta

        Examples:
            | Username or email address | Password       | mensagem                                                                           |
            | 123_ebac@teste.com        | Rodrigo@ebac01 | Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário. |


Cenário: Fazer login na plataforma EBAC-Shop com senha inválida
Dado que eu acesse a página de login
Quando eu digitar <Username or email address> e <Password>
E clicar no botão login
Então deve exibir <mensage> de alerta

        Examples:
            | Username or email address | Password      | mensagem                                                                                        |
            | rodrigo.ebac@ebacshop.com | 123@teste.com | Erro: a senha fornecida para o e-mail rodrigo.ebac@ebacshop.com está incorreta. Perdeu a senha? |
