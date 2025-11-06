# API Controle de Caixa

## Descrição
API REST para conferência e controle de caixa, com autenticação JWT, contagem de notas/moedas, revisão e documentação Swagger.

## Funcionalidades
- Cadastro e login de usuários (autenticação JWT)
- Registro sequencial de quantidade de cada nota/moeda
- Cálculo do valor em dinheiro
- Revisão e edição das quantidades inseridas
- Armazenamento dos dados em memória
- Documentação Swagger acessível em `/api-docs`

## Endpoints

### Autenticação
- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login e obtenção de token JWT

### Contagem de Caixa
- `POST /cash/denomination` — Registrar quantidade de nota/moeda (JWT obrigatório)
- `GET /cash/result` — Obter resultado da contagem (JWT obrigatório)

### Revisão
- `GET /review` — Visualizar revisão da contagem (JWT obrigatório)
- `PUT /review/denomination` — Editar quantidade de nota/moeda (JWT obrigatório)

## Como usar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Autenticação
- Após login, utilize o token JWT retornado no header `Authorization: Bearer <token>` para acessar os endpoints protegidos.

## Estrutura do Projeto
- `src/routes` — Rotas da API
- `src/controllers` — Lógica dos endpoints
- `src/models` — Modelos e banco em memória
- `src/middleware` — Middleware de autenticação JWT
- `resources/swagger.json` — Documentação Swagger

## Observações
- Todos os dados são armazenados em memória (não persistem após reiniciar o servidor).
- As respostas e status code seguem o especificado na documentação Swagger.

## Licença
MIT

## Testes de Performance (K6)

Este projeto inclui testes de performance utilizando [K6](https://k6.io/).

### Como executar os testes de performance

1. Instale o K6 globalmente:
   ```bash
   npm install -g k6
   ```
   Ou baixe o binário no site oficial.

2. Execute os scripts de teste localizados na pasta `performance`:
   ```bash
   k6 run performance/01-auth.register.test.js
   ```
   (Altere o nome do arquivo conforme o teste desejado)

3. Para configurar a URL da API, defina a variável de ambiente `BASE_URL`:
   ```bash
   BASE_URL=http://localhost:3000 k6 run performance/01-auth.register.test.js
   ```

### Observações importantes
- Os scripts de K6 usam variáveis de ambiente para facilitar a configuração.
- Consulte os arquivos em `performance/utils` para funções auxiliares.
- Certifique-se de que a API esteja rodando antes de executar os testes de performance.