const request = require("supertest");
const { expect } = require("chai");

describe("Cash", () => {
  describe("POST /cash/denomination", () => {
    it("Deve retornar 401 ao tentar registrar quantidade de notas/moedas sem token", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "") //.unset("Authorization") ou .set("Authorization", undefined)
        .send({
          type: "100",
          quantity: "2",
        });

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property("message", "Token não fornecido");
    });

    it("Deve retornar 403 ao tentar registrar quantidade de notas/moedas com token inválido", async () => {
      const resposta = await request("http://localhost:3000") //tentar melhorar esse teste conforme orientação do Chris: Sim, caso você queira algo mais próximo do invalido pode tentar usar um jwt dentro do mesmo formato e com a mesma quantia de caracteres, porém trocando alguns caracteres pra ter algo mais próximo porém invalido
        .post("/cash/denomination")
        .set("Authorization", "aeareiu")
        .send({
          type: "100",
          quantity: "2",
        });

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property("message", "Token inválido");
    });

    it("Deve retornar 200 ao tentar registrar quantidade de notas/moedas com token válido", async () => {
      const respostaLogin = await request("http://localhost:3000") //colocar esse teste nos testes manuais e documentação de caso de teste
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "geissy.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property("message","Quantidade registrada");

    });

    it("Deve retornar 403 ao tentar registrar quantidade de notas/moedas sem cadastro", async () => {
      const respostaLogin = await request("http://localhost:3000") //verificar com neguinho se esse teste já não atende aos de cima. E se é possível um usuário cadastrado não inserir token ou inserir um token inválido
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "juliana.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property("message", "Token inválido");

    });

    it("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com type incorreto", async () => {
      const respostaLogin = await request("http://localhost:3000") 
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "geissy.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("message","Denominação ou quantidade inválida");

    });

    it("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com quantity incorreto", async () => {
      const respostaLogin = await request("http://localhost:3000") 
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "geissy.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "100",
          quantity: "a",
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("message","Denominação ou quantidade inválida");

    });

    it("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com quantity vazio", async () => {
      const respostaLogin = await request("http://localhost:3000") 
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "geissy.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "100",
          quantity: 0
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("message","Denominação ou quantidade inválida");

    });
  });
});
