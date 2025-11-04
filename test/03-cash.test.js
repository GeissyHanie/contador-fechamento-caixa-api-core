const request = require("supertest");
const { expect } = require("chai");

describe("Cash", () => {
  describe("POST /cash/denomination", () => {
    it("Deve retornar 401 ao tentar registrar quantidade de notas/moedas sem token", async () => {
      const resposta = await request("http://localhost:3000")
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
      const resposta = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + undefined)
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      expect(resposta.status).to.equal(403);
      expect(resposta.body).to.have.property("message", "Token inválido");
    });

    it("Deve retornar 200 ao tentar registrar quantidade de notas/moedas com token válido", async () => {
      const respostaLogin = await request("http://localhost:3000")
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "axel.araujo",
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
      expect(resposta.body).to.have.property(
        "message",
        "Quantidade registrada"
      );
    });

    it("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com type incorreto", async () => {
      const respostaLogin = await request("http://localhost:3000")
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "axel.araujo",
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
      expect(resposta.body).to.have.property(
        "message",
        "Denominação ou quantidade inválida"
      );
    });

    it("Deve retornar 400 ao tentar cadastrar quantidade de notas/moedas com quantity incorreto", async () => {
      const respostaLogin = await request("http://localhost:3000")
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "axel.araujo",
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
      expect(resposta.body).to.have.property(
        "message",
        "Denominação ou quantidade inválida"
      );
    });

    it("Deve retornar 200 com lista de notas e moedas cadastrados e valor total correto", async () => {
      const respostaLogin = await request("http://localhost:3000")
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "axel.araujo",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const respostaType100 = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "R$ 100",
          quantity: 2,
        });

      const respostaType200 = await request("http://localhost:3000")
        .post("/cash/denomination")
        .set("Authorization", "Bearer " + token)
        .send({
          type: "R$ 200",
          quantity: 3,
        });

      const resposta = await request("http://localhost:3000")
        .get("/cash/result")
        .set("Authorization", "Bearer " + token)
        
      expect(resposta.status).to.equal(200);
      expect(resposta.body.partials).to.be.an("array");
      expect(resposta.body.total).to.equal(800)
    });
  });
});
