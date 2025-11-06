const request = require("supertest");

const cadastrarUsuario = async function (username = "axel.araujo", password = "123456") {
  const resposta = await request(process.env.BASE_URL)
    .post("/auth/register")
    .set("Content-Type", "application/json")
    .send({ username, password });

  return resposta;
};

module.exports = { cadastrarUsuario };