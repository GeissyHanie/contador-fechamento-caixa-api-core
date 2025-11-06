const request = require("supertest");
const { expect } = require("chai");
const { cadastrarUsuario } = require("./helpers/cadastro_users");
require('dotenv').config();

describe("Cadastro de Usuário", () => {
  describe("POST /auth/register", () => {
    it.only("Deve retornar 201 ao cadastrar um novo usuário", async () => {
      const resposta = await cadastrarUsuario();

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("message","Usuário cadastrado com sucesso");
    });

    it("Deve retornar 409 ao tentar cadastrar um usuário já existente", async () => {
        const resposta = await cadastrarUsuario();

        expect(resposta.status).to.equal(409);
        expect(resposta.body).to.have.property("message", "Usuário já existe");
    });

    it("Deve retornar 400 ao tentar cadastrar um usuário sem inserir username e password", async () => {
        const resposta = await cadastrarUsuario("", "");

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property("message", "Usuário e senha obrigatórios");
    });
  });
});
