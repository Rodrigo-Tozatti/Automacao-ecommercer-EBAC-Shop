#language: pt

Funcionalidade: Cadastro de usuário
Como usuário do site EBAC-SHOP
Quero fazer meu cadastro no site

Regras do Negócio:

1 - A senha deve conter pelo menos 11 (onze) caracteres. Para torná-la mais forte, use letras maiúsculas e minúsculas,
    números e símbolos como '! " ? $ % ^ & ).'
2 - Senha com 03 caracteres --> deve exibir mensagem "Muito fraca - Digite uma senha segura."
3 - Senha com 08 caracteres --> deve exibir mensagem "Fraca - Digite uma senha segura."
4 - Senha com 10 caracteres --> deve exibir mensagem "Médio."
5 - Senha com 11 ou mais caracteres --> deve exibir mensagem "Forte."


Cenário: Cadastrar novo usuário com sucesso
Dado que eu acesse a página de login
Quando eu digitar <Email address> e <Password> válidos
E clicar no botão register
Então deve cadastrar um novo usuário

        Examples:
            | Email address        | Password        | mensagem                       |
            | aluno_ebac@teste.com | teste@teste.com | Olá, aluno (não é aluno? Sair) |


Cenário: Verificar mensagem de alerta de senha com 3 caracteres
Dado que eu acesse a página de login
Quando eu digitar <Email address> e <Password> com 3 caracteres
E clicar no botão register
Então deve exibir mensagem de alerta

        Examples:
            | Email address        | Password | mensagem                               |
            | aluno_ebac@teste.com | tes      | Muito fraca - Digite uma senha segura. |


Cenário: Verificar mensagem de alerta de senha com 8 caracteres
Dado que eu acesse a página de login
Quando eu digitar <Email address> e <Password> com 8 caracteres
E clicar no botão register
Então deve exibir mensagem de alerta

        Examples:
            | Email address        | Password | mensagem                         |
            | aluno_ebac@teste.com | teste@te | Fraca - Digite uma senha segura. |


Cenário: Verificar mensagem de alerta de senha com 10 caracteres
Dado que eu acesse a página de login
Quando eu digitar <Email address> e <Password> com 10 caracteres
E clicar no botão register
Então deve exibir mensagem de alerta

        Examples:
            | Email address        | Password   | mensagem                         |
            | aluno_ebac@teste.com | teste@test | Fraca - Digite uma senha segura. |


Cenário: Verificar mensagem de alerta de senha com 11 caracteres
Dado que eu acesse a página de login
Quando eu digitar <Email address> e <Password> com 11 caracteres
E clicar no botão register
Então deve exibir mensagem de alerta

        Examples:
            | Email address        | Password    | mensagem                         |
            | aluno_ebac@teste.com | teste@teste | Fraca - Digite uma senha segura. |
