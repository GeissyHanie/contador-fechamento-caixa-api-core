**Objetivo**
Criar uma API Rest para conferência e controle de caixa
**Contexto** 
- A API deverá ter funcionalidades baseadas nas seguintes regras de negócio:
Regras de Negócio 1: Acesso (Login e Cadastro)

RN1.1 O acesso à aplicação deve ser restrito a usuários cadastrados.
RN1.2 O usuário deve fornecer credenciais válidas (login e senha) para acessar o sistema.
RN1.3 A senha deve ser armazenada de forma segura (e.g., criptografada).
RN1.4 Deve haver uma funcionalidade para cadastro de novos usuários, permitindo que eles criem suas credenciais e acessem o sistema.

Regras de Negócio 2: Módulo de Contagem de Caixa

RN2.1 A contagem deve ser realizada sequencialmente para todas as denominações de notas e moedas (R$ 200, R$ 100, R$ 50, R$ 20, R$ 10, R$ 5, R$ 2, R$ 1, R$ 0,50, R$ 0,25, R$ 0,10, R$ 0,05).
RN2.2 O usuário deve informar a quantidade de cada nota/moeda.
RN2.3 O sistema deve calcular o valor parcial quantidade x Valor da nota/moeda).
RN2.4 O valor total em dinheiro da contagem é a soma dos valores totais de todas as notas/moedas.
RN2.5 Os dados de contagem (valor da nota/moeda e quantidade) devem ser armazenados temporariamente até a finalização ou revisão.


Regras de Negócio 3: Módulo de Resultado da Contagem e Revisão

RN3.1	Ao concluir a contagem de todas as notas/moedas, o sistema deve apresentar um resultado parcial.
RN3.2	A função Revisar Contagem deve permitir a visualização e edição das quantidades inseridas para cada nota/moeda.
RN3.3	Após qualquer edição nas notas/moedas, o sistema deve recalcular o Total em dinheiro e fornecer o resultado final.

**Regras**
- Não me pergunte nada, só faça.
- Só gere os endpoints estritamente necessários para o atendimento das regras de negócio.
- Para o atendimento da regra de negócio RN2.2, observar que o usuário deve inserir a quantidade de cada nota/moeda por vez.
- Para o atendimento da regra de negócio RN3.2, o usuário deverá poder alterar a quantidade de determinada nota/moeda caso perceba que inseriu a quantidade errada.
- Crie o arquivo package.json.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Exiba os endpoints agrupados por tags
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.