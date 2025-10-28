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
