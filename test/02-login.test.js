const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("./helpers/authentication");

describe("Login", () => {
    describe("POST /auth/login", () => {
        it("Deve retornar 200 com token em string ao efetuar login com credenciais válidas", async () => {
            const resposta = await obterToken();

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a("string");
        });

        it("Deve retornar 401 ao tentar efetuar login com credenciais inválidas", async () => {
            const resposta = await obterToken("gezilene.araujo", "123456");

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property("message","Credenciais inválidas");
        });
    });
})