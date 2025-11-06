const request = require("supertest");
const { expect } = require("chai");
const dotenv = require("dotenv");
const { obterToken } = require("./helpers/authentication");
const { cadastroDenomination } = require("./helpers/cadastro_denomination");

describe("Cash", () => {
  describe("POST /cash/denomination", () => {
    it("Deve retornar 401 ao tentar registrar quantidade de notas/moedas sem token", async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/cash/denomination")
        .unset("Authorization")
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property("message", "Token não fornecido");
    });

    it("Deve retornar 403 ao tentar registrar quantidade de notas/moedas com token inválido", async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + undefined)
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property("message", "Token inválido");
    });

    it.only("Deve retornar 200 ao tentar registrar quantidade de notas/moedas com token válido", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      const resposta = await cadastroDenomination(token, "R$ 100", 2);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property(
        "message",
        "Quantidade registrada"
      );
    });

    it.only("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com type incorreto", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      const resposta = await cadastroDenomination(token,"100", 2);

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "message",
        "Denominação ou quantidade inválida"
      );
    });

    it.only("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com quantity incorreto", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      const resposta = await cadastroDenomination(token,"R$ 100", -2);

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "message",
        "Denominação ou quantidade inválida"
      );
    });

    it.only("Deve retornar 200 com lista de notas e moedas cadastrados e valor total correto", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      await cadastroDenomination(token, "R$ 100", 2);
      await cadastroDenomination(token, "R$ 200", 3);

      const resposta = await request(process.env.BASE_URL)
        .get("/cash/result")
        .set("Authorization", "Bearer " + token);

      expect(resposta.status).to.equal(200);
      expect(resposta.body.partials).to.be.an("array");
      expect(resposta.body.total).to.equal(800);
    });
  });
});
