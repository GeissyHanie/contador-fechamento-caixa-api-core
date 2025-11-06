const request = require("supertest");
const { expect } = require("chai");
require('dotenv').config();

describe("Cadastro de Usuário", () => {
  describe("POST /auth/register", () => {
    it("Deve retornar 201 ao cadastrar um novo usuário", async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/register")
        .set("Content-Type", "application/json")
        .send({
          username: "axel.araujo",
          password: "123456",
        });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("message","Usuário cadastrado com sucesso");
    });

    it("Deve retornar 409 ao tentar cadastrar um usuário já existente", async () => {
        const resposta = await request(process.env.BASE_URL)
          .post("/auth/register")
          .set("Content-Type", "application/json")
          .send({
            username: "axel.araujo",
            password: "123456",
          });

        expect(resposta.status).to.equal(409);
        expect(resposta.body).to.have.property("message", "Usuário já existe");
    });

    it("Deve retornar 400 ao tentar cadastrar um usuário sem inserir username e password", async () => {
        const resposta = await request(process.env.BASE_URL)
          .post("/auth/register")
          .set("Content-Type", "application/json")
          .send({
            username: "",
            password: "",
          });

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property("message", "Usuário e senha obrigatórios");
    });
  });
});
