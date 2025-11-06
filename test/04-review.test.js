const request = require("supertest");
const { expect } = require("chai");
const { obterToken } = require("./helpers/authentication");

describe("Review Cash", () => {
  describe("PUT /review/denomination", () => {
    it("Deve retornar 200 ao realizar alteração nas denominações cadastradas", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      const resposta = await request(process.env.BASE_URL)
        .put("/review/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "R$ 100",
          quantity: 3,
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property(
        "message",
        "Quantidade atualizada"
      );
    });

    it("Deve retornar 200 e retornar uma lista com valor atualizado", async () => {
      const respostaLogin = await obterToken();

      const token = respostaLogin.body.token;

      const resposta = await request(process.env.BASE_URL)
        .get("/review")
        .set("Authorization", "Bearer " + token);

      expect(resposta.status).to.equal(200);
      expect(resposta.body.review).to.be.an("array");
      expect(resposta.body.total).to.equal(900);
    });
  });
});


